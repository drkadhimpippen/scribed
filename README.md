# Scribed - AI Medical Scribe

Scribed is a SMART on FHIR application that helps healthcare providers focus on patient care by automatically transcribing and documenting medical encounters.

## Features

- SMART on FHIR integration with Epic
- Single sign-on with Epic
- Audio encounter recording
- Automatic transcription
- AI-powered note generation
- Direct Epic EHR integration

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/scribed.git
cd scribed
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

## Deployment

### Deploying to Render

1. Fork this repository to your GitHub account

2. Create a new Web Service on Render:
   - Go to https://dashboard.render.com
   - Click "New +"
   - Select "Static Site"
   - Connect your GitHub repository
   - Fill in the following details:
     - Name: scribed
     - Build Command: `npm install && npm run build`
     - Publish Directory: `build`

3. Configure environment variables in Render:
   - REACT_APP_EPIC_CLIENT_ID: Your Epic App Orchard client ID
   - REACT_APP_EPIC_FHIR_URL: Your Epic FHIR server URL

4. Deploy:
   - Click "Create Static Site"
   - Render will automatically build and deploy your application

The application will be available at: `https://scribed.onrender.com` (or your custom domain)

## SMART on FHIR Configuration

1. Register your application in Epic's App Orchard
2. Configure the following in your Epic App Orchard settings:
   - Launch URL: `https://your-render-domain.com`
   - Redirect URL: `https://your-render-domain.com/auth-callback`
   - Required Scopes: 
     - launch/patient
     - patient/*.read
     - launch
     - openid
     - fhirUser

## License

MIT
