import { HouseData } from './types';

export const HOUSES: Record<string, HouseData> = {
  'house_1': {
    id: 'house_1',
    name: 'Grand Tang 2-201',
    address: 'Block 2, Unit 201, Grand Tang District',
    price: '$850k',
    tags: [
      { icon: 'sun', label: 'Lighting', value: 'Excellent', color: 'text-orange-500' },
      { icon: 'volume-2', label: 'Noise', value: '45dB', color: 'text-green-500' },
      { icon: 'wind', label: 'Airflow', value: 'Good', color: 'text-blue-500' }
    ],
    checklist: [
      { id: 'c1', label: 'Sound Insulation', options: ['Quiet', 'Average', 'Noisy'] },
      { id: 'c2', label: 'Wall Condition', options: ['Clean', 'Cracks', 'Peeling'] },
      { id: 'c3', label: 'Water Pressure', options: ['Strong', 'Weak', 'Unstable'] },
      { id: 'c4', label: 'Natural Light', options: ['Bright', 'Dim', 'Dark'] },
    ]
  },
  'house_2': {
    id: 'house_2',
    name: 'Sunny Bay 8-502',
    address: 'Building 8, Floor 5, Sunny Bay',
    price: '$1.2M',
    tags: [
      { icon: 'sun', label: 'Lighting', value: 'Average', color: 'text-yellow-500' },
      { icon: 'volume-2', label: 'Noise', value: '60dB', color: 'text-red-500' },
      { icon: 'thermometer', label: 'Temp', value: '22°C', color: 'text-green-500' }
    ],
    checklist: [
      { id: 'c1', label: 'Sound Insulation', options: ['Quiet', 'Average', 'Noisy'] },
      { id: 'c2', label: 'Wall Condition', options: ['Clean', 'Cracks', 'Peeling'] },
      { id: 'c5', label: 'Floor Level', options: ['Flat', 'Uneven', 'Damaged'] },
      { id: 'c6', label: 'Odor', options: ['None', 'Musty', 'Strong'] },
    ]
  }
};

export const MOCK_TRANSCRIPT = [
  "So this is the living room, facing south.",
  "The landlord mentioned they renovated last year.",
  "Can you check if the windows are double-glazed?",
  "It feels a bit darker in the kitchen area.",
  "Let's move to the master bedroom.",
  "What is the square footage again?",
  "The floor looks like original hardwood.",
  "Is there any history of water leakage here?",
  "The neighborhood seems pretty quiet today.",
];
