import { getAllServices } from '@/data/services';

export interface CaseType {
  name: string;
  slug: string;
  description: string;
  category: string;
  relatedServices: string[];
}

// Generate case type slug from name
export const createCaseTypeSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Get all unique case types from services
export const getAllCaseTypes = (): CaseType[] => {
  const services = getAllServices();
  const caseTypeMap = new Map<string, CaseType>();

  services.forEach(service => {
    service.caseTypes.forEach(caseTypeName => {
      const slug = createCaseTypeSlug(caseTypeName);
      
      if (!caseTypeMap.has(slug)) {
        caseTypeMap.set(slug, {
          name: caseTypeName,
          slug,
          description: getCaseTypeDescription(caseTypeName),
          category: getCaseTypeCategory(caseTypeName),
          relatedServices: [service.slug]
        });
      } else {
        const existing = caseTypeMap.get(slug)!;
        if (!existing.relatedServices.includes(service.slug)) {
          existing.relatedServices.push(service.slug);
        }
      }
    });
  });

  return Array.from(caseTypeMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

// Get case type by slug
export const getCaseTypeBySlug = (slug: string): CaseType | undefined => {
  return getAllCaseTypes().find(caseType => caseType.slug === slug);
};

// Get case type description
const getCaseTypeDescription = (caseTypeName: string): string => {
  const descriptions: Record<string, string> = {
    'Personal Injury': 'Comprehensive economic analysis for personal injury cases including lost earnings, medical costs, and life care planning.',
    'Wrongful Death': 'Economic loss assessment for wrongful death cases including lost earnings, household services, and survivor benefits.',
    'Medical Malpractice': 'Specialized economic analysis for medical malpractice cases with focus on future care costs and lost earning capacity.',
    'Disability Claims': 'Professional evaluation for disability claims including functional capacity assessment and vocational analysis.',
    'Workers\' Compensation': 'Complete workers\' compensation evaluation including wage loss, medical costs, and return-to-work planning.',
    'SSDI Evaluations': 'Social Security Disability evaluation services with comprehensive vocational and economic analysis.',
    'Rehabilitation Planning': 'Vocational rehabilitation planning services including skills assessment and job placement strategies.',
    'Job Placement': 'Employment placement services with labor market analysis and transferable skills evaluation.',
    'Catastrophic Injury': 'Specialized analysis for catastrophic injury cases with comprehensive life care planning and economic projections.',
    'Brain Injury': 'Traumatic brain injury economic analysis including cognitive assessment and long-term care planning.',
    'Spinal Cord Injury': 'Comprehensive spinal cord injury evaluation with equipment needs, modifications, and care cost analysis.',
    'Birth Trauma': 'Birth trauma economic analysis including developmental assessments and lifelong care planning.',
    'Partnership Disputes': 'Business partnership dispute analysis including valuation, profit allocation, and economic damages.',
    'Divorce Proceedings': 'Divorce-related economic analysis including business valuation, asset division, and support calculations.',
    'Social Security': 'Social Security Administration evaluation services including disability determination and vocational assessment.',
    'Disability Insurance': 'Disability insurance evaluation with comprehensive earning capacity and functional limitation analysis.',
    'Veterans Affairs': 'Veterans Administration evaluation services including disability rating and vocational rehabilitation assessment.',
    'Federal Court': 'Federal court expert testimony services with Daubert-compliant analysis and comprehensive documentation.',
    'State Court': 'State court litigation support including expert testimony, depositions, and economic analysis.',
    'Administrative Hearings': 'Administrative hearing support including expert testimony and economic evaluation services.',
    'Arbitration': 'Arbitration services with neutral economic analysis and expert consultation for dispute resolution.',
    'Business Planning': 'Strategic business planning with economic analysis, market research, and financial projections.',
    'Financial Analysis': 'Comprehensive financial analysis including cash flow projections, profitability analysis, and risk assessment.',
    'Market Studies': 'Market research and analysis including competitive analysis, demand forecasting, and market opportunity assessment.',
    'Risk Management': 'Risk assessment and management services including financial risk analysis and mitigation strategies.'
  };

  return descriptions[caseTypeName] || `Professional analysis and expert services for ${caseTypeName.toLowerCase()} cases.`;
};

// Get case type category
const getCaseTypeCategory = (caseTypeName: string): string => {
  const categories: Record<string, string> = {
    'Personal Injury': 'litigation',
    'Wrongful Death': 'litigation',
    'Medical Malpractice': 'litigation',
    'Disability Claims': 'disability',
    'Workers\' Compensation': 'disability',
    'SSDI Evaluations': 'disability',
    'Rehabilitation Planning': 'vocational',
    'Job Placement': 'vocational',
    'Catastrophic Injury': 'litigation',
    'Brain Injury': 'litigation',
    'Spinal Cord Injury': 'litigation',
    'Birth Trauma': 'litigation',
    'Partnership Disputes': 'business',
    'Divorce Proceedings': 'litigation',
    'Social Security': 'disability',
    'Disability Insurance': 'disability',
    'Veterans Affairs': 'disability',
    'Federal Court': 'legal',
    'State Court': 'legal',
    'Administrative Hearings': 'legal',
    'Arbitration': 'legal',
    'Business Planning': 'business',
    'Financial Analysis': 'business',
    'Market Studies': 'business',
    'Risk Management': 'business'
  };

  return categories[caseTypeName] || 'general';
};