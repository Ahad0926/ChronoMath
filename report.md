## Prerequisites
- [Python 3.13.2]([https://www.python.org/downloads/release/python-3132/])
- [Node 22.14.0]([https://nodejs.org/en/download/])
- Firebase Project

## Installation
1. Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/MdTanjeemHaider/ChronoMath
cd ChronoMath
```
2. Create a python virtual environment and activate it:
```bash
python -m venv venv

# on Windows
venv\Scripts\activate 

# on Linux or MacOS
source venv/bin/activate 
```
3. Install the required python packages:
```bash
pip install -r backend\chronomath\requirements.txt
```
4. Create a `.env` file in the `backend/chronomath/configs` directory and add the following lines:
```bash
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
FLASK_SECRET_KEY=YOUR_FLASK_SECRET_KEY
```
5. Generate a new private key from the Firebase console and save it as `firebase_creds.json` in the `backend/chronomath/configs` directory.
6. Run the backend server:
```bash
python backend\chronomath\app.py
```
7. Open a new terminal and navigate to the project directory:
```bash
cd ChronoMath
```
8. Navigate to the frontend directory and install the required packages:
```bash
cd frontend\chronomath
npm install
```
9. Run the frontend server:
```bash
ng serve
```