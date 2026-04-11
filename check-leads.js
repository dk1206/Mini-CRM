const dotenv = require('dotenv');
dotenv.config();

const API_URL = 'http://localhost:5000/api';

// First, login to get a token
async function login() {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@mini-crm.com',
        password: 'admin12345'
      })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.token;
  } catch (error) {
    console.error('Login error:', error.message);
    return null;
  }
}

// Get all leads
async function getLeads(token) {
  try {
    const response = await fetch(`${API_URL}/leads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error('Get leads error:', error.message);
    return [];
  }
}

async function main() {
  console.log('📊 Fetching all leads from the dashboard...\n');
  
  const token = await login();
  if (!token) {
    console.error('Failed to login');
    return;
  }
  
  console.log('✓ Logged in successfully\n');
  
  const leads = await getLeads(token);
  console.log(`📋 Total leads: ${leads.length}\n`);
  
  leads.forEach((lead, index) => {
    console.log(`${index + 1}. ${lead.name}`);
    console.log(`   Email: ${lead.email}`);
    console.log(`   Phone: ${lead.phone || 'N/A'}`);
    console.log(`   Source: ${lead.source}`);
    console.log(`   Status: ${lead.status}`);
    console.log(`   Notes: ${lead.notes || 'None'}`);
    console.log('');
  });
}

main();
