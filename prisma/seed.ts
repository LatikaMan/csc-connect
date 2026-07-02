import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Seed Categories
  const categories = [
    { name: 'Identity Documents', nameHindi: 'पहचान दस्तावेज़', icon: 'id-card', color: '#4F46E5', order: 1 },
    { name: 'Banking & Finance', nameHindi: 'बैंकिंग और वित्त', icon: 'bank', color: '#059669', order: 2 },
    { name: 'Education', nameHindi: 'शिक्षा', icon: 'graduation-cap', color: '#D97706', order: 3 },
    { name: 'Healthcare', nameHindi: 'स्वास्थ्य', icon: 'heart', color: '#DC2626', order: 4 },
    { name: 'Agriculture', nameHindi: 'कृषि', icon: 'wheat', color: '#65A30D', order: 5 },
    { name: 'Insurance', nameHindi: 'बीमा', icon: 'shield', color: '#0891B2', order: 6 },
    { name: 'Utility Bills', nameHindi: 'उपयोगिता बिल', icon: 'zap', color: '#7C3AED', order: 7 },
    { name: 'Travel', nameHindi: 'यात्रा', icon: 'train', color: '#C2410C', order: 8 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: cat,
      create: cat,
    })
    console.log(`  ✅ Category: ${cat.name}`)
  }

  // Categories को डेटाबेस से दोबारा सही ID के साथ निकालें
  const identityCat = await prisma.category.findUnique({ where: { name: 'Identity Documents' } })
  const bankingCat  = await prisma.category.findUnique({ where: { name: 'Banking & Finance' } })
  const healthCat   = await prisma.category.findUnique({ where: { name: 'Healthcare' } })
  const travelCat   = await prisma.category.findUnique({ where: { name: 'Travel' } })

  if (!identityCat || !bankingCat || !healthCat || !travelCat) {
    throw new Error('Required categories were not found in database.')
  }

  // 2. Seed Services
  const services = [
    {
      categoryId: identityCat.id,
      name: 'PAN Card',
      nameHindi: 'पैन कार्ड',
      slug: 'pan-card',
      description: 'Apply for a new PAN card or update existing PAN card details through authorized CSC centers.',
      eligibility: 'Indian citizens above 18 years of age.',
      fees: 107,
      processingDays: 15,
      icon: 'credit-card',
      importantNotes: 'Ensure all documents are self-attested. Original documents may be required for verification.',
      faqs: [
        { question: 'How long does PAN card take?', answer: 'Usually 15-20 working days after application.' },
        { question: 'Can I apply for PAN card online?', answer: 'Yes, through authorized CSC centers.' }
      ]
    },
    {
      categoryId: identityCat.id,
      name: 'Aadhaar Card Update',
      nameHindi: 'आधार कार्ड अपडेट',
      slug: 'aadhaar-update',
      description: 'Update your name, address, date of birth, mobile number or other details in Aadhaar card.',
      eligibility: 'All Indian residents with existing Aadhaar.',
      fees: 50,
      processingDays: 7,
      icon: 'fingerprint',
      importantNotes: 'Mobile number update requires biometric verification.',
      faqs: []
    },
    {
      categoryId: identityCat.id,
      name: 'Income Certificate',
      nameHindi: 'आय प्रमाण पत्र',
      slug: 'income-certificate',
      description: 'Official government certificate stating the annual income of an individual or family.',
      eligibility: 'All Indian citizens.',
      fees: 30,
      processingDays: 7,
      icon: 'file-text',
      faqs: []
    },
    {
      categoryId: identityCat.id,
      name: 'Caste Certificate',
      nameHindi: 'जाति प्रमाण पत्र',
      slug: 'caste-certificate',
      description: 'Official certificate proving the caste of an individual for government benefits.',
      eligibility: 'SC/ST/OBC citizens of India.',
      fees: 30,
      processingDays: 10,
      icon: 'award',
      faqs: []
    },
    {
      categoryId: identityCat.id,
      name: 'Domicile Certificate',
      nameHindi: 'निवास प्रमाण पत्र',
      slug: 'domicile-certificate',
      description: 'Certificate proving permanent residence in a specific state or district.',
      eligibility: 'Permanent residents of the state.',
      fees: 30,
      processingDays: 10,
      icon: 'home',
      faqs: []
    },
    {
      categoryId: travelCat.id,
      name: 'Passport Application',
      nameHindi: 'पासपोर्ट आवेदन',
      slug: 'passport-application',
      description: 'Apply for a fresh passport or renewal through CSC centers across India.',
      eligibility: 'All Indian citizens.',
      fees: 1500,
      processingDays: 30,
      icon: 'book-open',
      faqs: []
    },
    {
      categoryId: travelCat.id,
      name: 'Railway Ticket Booking',
      nameHindi: 'रेलवे टिकट बुकिंग',
      slug: 'railway-ticket',
      description: 'Book railway tickets for any train across India at your nearest CSC center.',
      eligibility: 'Open to all.',
      fees: 20,
      processingDays: 0,
      icon: 'train',
      faqs: []
    },
    {
      categoryId: healthCat.id,
      name: 'Ayushman Card',
      nameHindi: 'आयुष्मान कार्ड',
      slug: 'ayushman-card',
      description: 'Apply for Ayushman Bharat health insurance card for free medical treatment up to ₹5 lakhs.',
      eligibility: 'Families listed in SECC 2011 data.',
      fees: 0,
      processingDays: 7,
      icon: 'heart',
      faqs: []
    },
    {
      categoryId: bankingCat.id,
      name: 'Electricity Bill Payment',
      nameHindi: 'बिजली बिल भुगतान',
      slug: 'electricity-bill',
      description: 'Pay your electricity bill instantly at any CSC center.',
      eligibility: 'All electricity consumers.',
      fees: 10,
      processingDays: 0,
      icon: 'zap',
      faqs: []
    },
    {
      categoryId: bankingCat.id,
      name: 'PM Kisan Registration',
      nameHindi: 'पीएम किसान पंजीकरण',
      slug: 'pm-kisan',
      description: 'Register for PM Kisan Samman Nidhi scheme to receive ₹6000 per year.',
      eligibility: 'Small and marginal farmers with land up to 2 hectares.',
      fees: 0,
      processingDays: 30,
      icon: 'sprout',
      faqs: []
    },
  ]

  for (const svc of services) {
    const formattedFaqs = svc.faqs ? JSON.stringify(svc.faqs) : '[]';

    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {
        ...svc,
        faqs: formattedFaqs
      },
      create: { 
        ...svc, 
        faqs: formattedFaqs 
      },
    })
    console.log(`  ✅ Service: ${svc.name}`)
  }

  // 3. Seed Required Documents for PAN Card
  const panService = await prisma.service.findUnique({ where: { slug: 'pan-card' } })
  if (panService) {
    const panDocs = [
      { name: 'Aadhaar Card', nameHindi: 'आधार कार्ड', description: 'Self-attested copy of Aadhaar card', isOptional: false, order: 1 },
      { name: 'Passport Size Photo', nameHindi: 'पासपोर्ट फोटो', description: '2 recent passport size photographs', isOptional: false, order: 2 },
      { name: 'Proof of Date of Birth', nameHindi: 'जन्म तिथि प्रमाण', description: 'Birth certificate or 10th marksheet', isOptional: false, order: 3 },
      { name: 'Address Proof', nameHindi: 'पता प्रमाण', description: 'Voter ID, utility bill, or bank statement', isOptional: false, order: 4 },
    ]
    for (const doc of panDocs) {
      const docId = `pan-${doc.order}`;
      await prisma.requiredDocument.upsert({
        where: { id: docId },
        update: doc,
        create: { id: docId, serviceId: panService.id, ...doc },
      })
    }
    console.log('  ✅ PAN Card documents seeded')
  }

  // 4. Seed Settings
  await prisma.setting.upsert({
    where: { key: 'site_name' },
    update: { value: 'CSC Connect' },
    create: { key: 'site_name', value: 'CSC Connect' },
  })
  await prisma.setting.upsert({
    where: { key: 'contact_phone' },
    update: { value: '+91 9999999999' },
    create: { key: 'contact_phone', value: '+91 9999999999' },
  })

  console.log('\n🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    // Optional chaining (?) जोड़ा गया है ताकि क्रैश न हो
    await prisma?.$disconnect()
  })