import FHIR from 'fhirclient';
import { Patient, Encounter } from '../types';

// Epic's OAuth 2.0 authorization endpoint
const EPIC_AUTH_URL = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize';
const EPIC_TOKEN_URL = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token';
const EPIC_FHIR_URL = process.env.REACT_APP_EPIC_FHIR_URL || 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/';

class FHIRService {
  private client: any = null;

  async initialize() {
    try {
      // Initialize SMART on FHIR client with EHR launch parameters
      this.client = await FHIR.oauth2.init({
        clientId: process.env.REACT_APP_EPIC_CLIENT_ID,
        scope: 'launch openid fhirUser patient/*.read encounter.read encounter.write documentreference.write',
        redirectUri: `${window.location.origin}/auth-callback`,
        iss: EPIC_FHIR_URL,
        launch: new URLSearchParams(window.location.search).get('launch') || undefined
      });
      return true;
    } catch (error) {
      console.error('Failed to initialize FHIR client:', error);
      return false;
    }
  }

  async getPatient(): Promise<Patient | null> {
    try {
      if (!this.client) {
        throw new Error('FHIR client not initialized');
      }

      const patient = await this.client.patient.read();
      return {
        id: patient.id,
        name: `${patient.name?.[0]?.given?.[0] || ''} ${patient.name?.[0]?.family || ''}`.trim(),
        birthDate: patient.birthDate || '',
        gender: patient.gender || '',
      };
    } catch (error) {
      console.error('Failed to get patient:', error);
      return null;
    }
  }

  async createEncounter(patientId: string): Promise<Encounter | null> {
    try {
      if (!this.client) {
        throw new Error('FHIR client not initialized');
      }

      const encounter = await this.client.create({
        resourceType: 'Encounter',
        status: 'in-progress',
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
          display: 'ambulatory',
        },
        subject: {
          reference: `Patient/${patientId}`,
        },
        period: {
          start: new Date().toISOString(),
        },
      });

      return {
        id: encounter.id,
        status: 'in-progress',
        patientId,
        startTime: encounter.period.start,
      };
    } catch (error) {
      console.error('Failed to create encounter:', error);
      return null;
    }
  }

  async updateEncounter(encounterId: string, status: 'finished' | 'cancelled'): Promise<boolean> {
    try {
      if (!this.client) {
        throw new Error('FHIR client not initialized');
      }

      await this.client.update({
        resourceType: 'Encounter',
        id: encounterId,
        status,
        period: {
          end: new Date().toISOString(),
        },
      });

      return true;
    } catch (error) {
      console.error('Failed to update encounter:', error);
      return false;
    }
  }

  async submitNote(encounterId: string, note: string): Promise<boolean> {
    try {
      if (!this.client) {
        throw new Error('FHIR client not initialized');
      }

      await this.client.create({
        resourceType: 'DocumentReference',
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '11506-3',
              display: 'Progress note',
            },
          ],
        },
        subject: {
          reference: `Encounter/${encounterId}`,
        },
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data: btoa(note), // Base64 encode the note
            },
          },
        ],
      });

      return true;
    } catch (error) {
      console.error('Failed to submit note:', error);
      return false;
    }
  }
}

export const fhirService = new FHIRService();
export default fhirService; 