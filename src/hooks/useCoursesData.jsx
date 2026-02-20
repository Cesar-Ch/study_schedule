import { useState, useEffect } from 'react';

export const useCoursesData = () => {
  const [coursesData, setCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        
        const data = await fetch('http://localhost:3000/data').then(res => res.json())
        setCoursesData(data);
        
        setError(null);
      } catch (err) {
        console.error('Error cargando cursos:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  return { coursesData, isLoading, error };
};