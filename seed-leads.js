const dotenv = require('dotenv');

dotenv.config();

const API_URL = 'http://localhost:5000/api';

// Sample leads to add
const sampleLeads = [
  {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0101',
    source: 'Website',
    status: 'new',
    notes: 'Interested in premium plan'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0102',
    source: 'LinkedIn',
    status: 'new',
    notes: 'Referred by Alex'
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1-555-0103',
    source: 'Referral',
    status: 'contacted',
    notes: 'Follows up on Monday'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1-555-0104',
    source: 'Website',
    status: 'new',
    notes: 'Trial user from marketing campaign'
  },
  {
    name: 'Robert Williams',
    email: 'robert.williams@email.com',
    phone: '+1-555-0105',
    source: 'Other',
    status: 'converted',
    notes: 'Signed on March 28'
  },
  {
    name: 'Jessica Martinez',
    email: 'jessica.martinez@email.com',
    phone: '+1-555-0106',
    source: 'Website',
    status: 'contacted',
    notes: 'Sent demo link yesterday'
  }
];

async function addLead(lead) {
  try {
    const response = await fetch(`${API_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.errors?.[0]?.msg || 'Unknown error');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function seedLeads() {
  try {
    console.log('🌱 Starting to seed leads...\n');

    for (let i = 0; i < sampleLeads.length; i++) {
      const lead = sampleLeads[i];
      try {
        const result = await addLead(lead);
        console.log(`✓ Lead ${i + 1} added: ${lead.name} (${lead.email})`);
        console.log(`  ID: ${result._id}`);
      } catch (error) {
        console.error(`✗ Error adding lead ${i + 1} (${lead.name}):`);
        console.error(`  Error: ${error.message}`);
      }
    }

    console.log('\n✓ Seeding complete!');
  } catch (error) {
    console.error('Fatal error:', error.message);
  }
}

seedLeads();
