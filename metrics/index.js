const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), append);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
 function append(auth) {
    let values = [];
    let datos =  JSON.parse(fs.readFileSync('metrics/coverage/coverage-summary.json', 'utf8'))
    let fecha = new Date();
    let mes = fecha.getMonth()+1;
    values.push(
        [fecha.getFullYear()+"-"+mes+"-"+fecha.getDate(),
        process.env.TRAVIS_BRANCH?process.env.TRAVIS_BRANCH:"no travis_BRANCH",
        process.env.TRAVIS_COMMIT?process.env.TRAVIS_COMMIT:"no travis_commit",
         process.env.TRAVIS_COMMIT_MESSAGE?process.env.TRAVIS_COMMIT_MESSAGE:"no travis_BRANCH",
        datos.total.lines.total, datos.total.lines.covered, 
        datos.total.statements.total, datos.total.statements.covered, 
        datos.total.functions.total, datos.total.functions.covered,  
        datos.total.branches.total, datos.total.branches.covered, 
        ]
    );
    let resource = {
            values,
          };
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.append({
    spreadsheetId: '1iYKzdPCiHKf68W9A78q6UN7ikz4lXi3frkkK0HVzO08',
    range: 'Sheet1!A2:L2',
    valueInputOption: 'USER_ENTERED',
    resource 
  }, (err, result) => {
  });
}