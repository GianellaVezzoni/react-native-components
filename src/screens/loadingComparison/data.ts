export interface MockDataItem {
  id: string;
  title: string;
  description: string;
  author: string;
}

export const MOCK_DATA: MockDataItem[] = [
  {
    id: '1',
    title: 'Understanding React Native Performance',
    description:
      'Learn how to optimize your React Native apps for better performance and user experience.',
    author: 'John Doe',
  },
  {
    id: '2',
    title: 'Modern UI Design Patterns',
    description:
      'Explore the latest design patterns and best practices for creating beautiful mobile interfaces.',
    author: 'Jane Smith',
  },
  {
    id: '3',
    title: 'State Management in React',
    description:
      'A comprehensive guide to managing state in React applications using various techniques.',
    author: 'Mike Johnson',
  },
  {
    id: '4',
    title: 'Building Scalable Apps',
    description:
      'Discover strategies for building applications that can grow with your user base.',
    author: 'Sarah Williams',
  },
  {
    id: '5',
    title: 'Testing Best Practices',
    description:
      'Learn how to write effective tests that ensure your code quality and reliability.',
    author: 'David Brown',
  },
];
