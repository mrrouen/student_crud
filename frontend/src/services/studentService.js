/**
 * Resolves the backend base URL dynamically:
 * - When deployed on Render or provided via VITE_API_BASE_URL: uses the full remote URL
 * - In local development (when unset): uses relative path '' so Vite's dev proxy forwards to localhost:8080
 */
function getApiRoot() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    const withoutProto = clean.replace(/^https?:\/\//i, '');
    if (!withoutProto.includes('.') && !withoutProto.includes('localhost')) {
      clean = `https://${withoutProto}.onrender.com`;
    } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    return clean;
  }
  return '';
}

const BASE_URL = `${getApiRoot()}/reyes/students`;

/**
 * Service to interact with the Student CRUD Spring Boot REST API
 */
export const studentService = {
  /**
   * Fetch all students
   * @returns {Promise<Array>} List of student objects
   */
  async getAllStudents() {
    const response = await fetch(BASE_URL, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load students: ${response.statusText} (${response.status})`);
    }

    return await response.json();
  },

  /**
   * Fetch a single student by id
   * @param {number|string} id 
   * @returns {Promise<Object>} Student object
   */
  async getStudentById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Failed to fetch student #${id}`);
    }

    return await response.json();
  },

  /**
   * Create a new student
   * @param {{ firstname: string, lastname: string, course: string, section: string }} studentData 
   * @returns {Promise<Object>} Created student object
   */
  async createStudent(studentData) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Failed to create student: status ${response.status}`);
    }

    return await response.json();
  },

  /**
   * Update an existing student by id
   * @param {number|string} id 
   * @param {{ firstname: string, lastname: string, course: string, section: string }} studentData 
   * @returns {Promise<Object>} Updated student object
   */
  async updateStudent(id, studentData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Failed to update student #${id}`);
    }

    return await response.json();
  },

  /**
   * Delete a student by id
   * @param {number|string} id 
   * @returns {Promise<string>} Success message
   */
  async deleteStudent(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText || `Failed to delete student #${id}`);
    }

    return responseText;
  },
};
