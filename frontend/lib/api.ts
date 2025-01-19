const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Fetch all developers
export async function fetchDevelopers() {
  try {
    const response = await fetch(`${API_BASE_URL}/developers`, {
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching developers:", error);
    return [];
  }
}

// Fetch a specific developer by ID
export async function fetchDeveloperById(developerId) {
  try {
    const response = await fetch(`${API_BASE_URL}/developers/${developerId}`, {
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching developer with ID ${developerId}:`, error);
    return null;
  }
}

// Fetch all repositories
export async function fetchRepositories() {
  try {
    const response = await fetch(`${API_BASE_URL}/repositories`, {
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

// Fetch a specific repository by ID
export async function fetchRepositoryById(repositoryId) {
  try {
    const response = await fetch(`${API_BASE_URL}/repositories/${repositoryId}`, {
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching repository with ID ${repositoryId}:`, error);
    return null;
  }
}
