export const templateDevelopers = [
  { 
    id: 1, 
    name: 'Dev1', 
    icon: 'https://github.com/dev1.png', 
    repoCount: 15, 
    commitCount: 230, 
    description: 'Full-stack developer passionate about React and Node.js',
    languages: [
      { name: 'JavaScript', percentage: 40 },
      { name: 'TypeScript', percentage: 30 },
      { name: 'Python', percentage: 20 },
      { name: 'HTML', percentage: 10 }
    ],
    repositories: [
      { id: 101, name: 'awesome-react', icon: '/placeholder.svg?height=40&width=40', starCount: 120, description: 'A curated list of React resources', languages: [
        { name: 'JavaScript', percentage: 80 },
        { name: 'HTML', percentage: 20 }
      ]},
      { id: 102, name: 'node-api-boilerplate', icon: '/placeholder.svg?height=40&width=40', starCount: 85, description: 'Boilerplate for Node.js APIs', languages: [
        { name: 'JavaScript', percentage: 90 },
        { name: 'TypeScript', percentage: 10 }
      ]},
      { id: 103, name: 'python-data-analysis', icon: '/placeholder.svg?height=40&width=40', starCount: 65, description: 'Data analysis tools in Python', languages: [
        { name: 'Python', percentage: 100 }
      ]}
    ]
  },
  { 
    id: 2, 
    name: 'Dev2', 
    icon: 'https://github.com/dev2.png', 
    repoCount: 8, 
    commitCount: 120, 
    description: 'Ruby on Rails expert with a love for clean code',
    languages: [
      { name: 'Ruby', percentage: 50 },
      { name: 'JavaScript', percentage: 30 },
      { name: 'CSS', percentage: 20 }
    ],
    repositories: [
      { id: 201, name: 'rails-ecommerce', icon: '/placeholder.svg?height=40&width=40', starCount: 95, description: 'E-commerce platform built with Ruby on Rails', languages: [
        { name: 'Ruby', percentage: 70 },
        { name: 'JavaScript', percentage: 20 },
        { name: 'CSS', percentage: 10 }
      ]},
      { id: 202, name: 'js-testing-framework', icon: '/placeholder.svg?height=40&width=40', starCount: 72, description: 'Lightweight JavaScript testing framework', languages: [
        { name: 'JavaScript', percentage: 100 }
      ]},
      { id: 203, name: 'css-animation-library', icon: '/placeholder.svg?height=40&width=40', starCount: 58, description: 'CSS animation library for web applications', languages: [
        { name: 'CSS', percentage: 80 },
        { name: 'JavaScript', percentage: 20 }
      ]}
    ]
  },
  { 
    id: 3, 
    name: 'Dev3', 
    icon: 'https://github.com/dev3.png', 
    repoCount: 22, 
    commitCount: 450, 
    description: 'Machine learning enthusiast specializing in Python and Java',
    languages: [
      { name: 'Python', percentage: 60 },
      { name: 'Java', percentage: 30 },
      { name: 'C#', percentage: 10 }
    ],
    repositories: [
      { id: 301, name: 'ml-algorithms', icon: '/placeholder.svg?height=40&width=40', starCount: 210, description: 'Implementation of popular machine learning algorithms', languages: [
        { name: 'Python', percentage: 90 },
        { name: 'Java', percentage: 10 }
      ]},
      { id: 302, name: 'java-design-patterns', icon: '/placeholder.svg?height=40&width=40', starCount: 180, description: 'Examples of design patterns in Java', languages: [
        { name: 'Java', percentage: 100 }
      ]},
      { id: 303, name: 'data-visualization-toolkit', icon: '/placeholder.svg?height=40&width=40', starCount: 135, description: 'Tools for data visualization in Python', languages: [
        { name: 'Python', percentage: 80 },
        { name: 'JavaScript', percentage: 20 }
      ]}
    ]
  },
  { 
    id: 4, 
    name: 'Dev4', 
    icon: 'https://github.com/dev4.png', 
    repoCount: 12, 
    commitCount: 180, 
    description: 'Golang advocate and distributed systems engineer',
    languages: [
      { name: 'Go', percentage: 40 },
      { name: 'Rust', percentage: 30 },
      { name: 'TypeScript', percentage: 30 }
    ],
    repositories: [
      { id: 401, name: 'distributed-cache', icon: '/placeholder.svg?height=40&width=40', starCount: 150, description: 'Distributed caching system written in Go', languages: [
        { name: 'Go', percentage: 100 }
      ]},
      { id: 402, name: 'rust-web-framework', icon: '/placeholder.svg?height=40&width=40', starCount: 120, description: 'Lightweight web framework in Rust', languages: [
        { name: 'Rust', percentage: 100 }
      ]},
      { id: 403, name: 'typescript-microservices', icon: '/placeholder.svg?height=40&width=40', starCount: 95, description: 'Microservices architecture with TypeScript', languages: [
        { name: 'TypeScript', percentage: 90 },
        { name: 'JavaScript', percentage: 10 }
      ]}
    ]
  },
];

export const templateRepositories = [
  { 
    id: 1, 
    name: 'awesome-react', 
    icon: '/placeholder.svg?height=40&width=40', 
    starCount: 120, 
    description: 'A curated list of React resources', 
    languages: [
      { name: 'JavaScript', percentage: 80 },
      { name: 'HTML', percentage: 20 }
    ]
  },
  { 
    id: 2, 
    name: 'node-api-boilerplate', 
    icon: '/placeholder.svg?height=40&width=40', 
    starCount: 85, 
    description: 'Boilerplate for Node.js APIs', 
    languages: [
      { name: 'JavaScript', percentage: 90 },
      { name: 'TypeScript', percentage: 10 }
    ]
  },
  { 
    id: 3, 
    name: 'python-data-analysis', 
    icon: '/placeholder.svg?height=40&width=40', 
    starCount: 65, 
    description: 'Data analysis tools in Python', 
    languages: [
      { name: 'Python', percentage: 100 }
    ]
  },
  { 
    id: 4, 
    name: 'go-microservices', 
    icon: '/placeholder.svg?height=40&width=40', 
    starCount: 95, 
    description: 'Microservices architecture with Go', 
    languages: [
      { name: 'Go', percentage: 100 }
    ]
  },
];

export const getTemplateData = (type: 'user' | 'repository', count: number = 1) => {
  const data = type === 'user' ? templateDevelopers : templateRepositories;
  return data.slice(0, count);
};

