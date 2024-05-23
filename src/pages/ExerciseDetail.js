import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Detail from '../components/Detail';
import ExerciseVideo from '../components/ExerciseVideo';

import { useParams } from 'react-router-dom';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const { id } = useParams();
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = `https://youtube-search-and-download.p.rapidapi.com`;

      try {
        // Fetch exercise details
        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        setExerciseDetail(exerciseDetailData);

        // Fetch related YouTube videos
        const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
        setExerciseVideos(exerciseVideosData.contents);
        {toast.error('Youtube Video not currently available')}

        const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equimentExercisesData);
      } catch (error) {
        console.error('Failed to fetch exercise data:', error);
        setExerciseVideos([]);
      } finally {
        setLoading(false); // Set loading to false once data fetching is done
      }

      
    
    };

    fetchExercisesData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      {exerciseVideos > 0 ? (
        <ExerciseVideo exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      ) : (
        <>
        <Typography sx={{ fontSize: { lg: '24px', xs: '18px' }, fontWeight: 700, textTransform: 'capitalize', textAlign: 'center', mt: 4 }}>
          Related Videos will be visible shortly.
          
        </Typography>
        </>
      )}
    </Box>
  );
};

export default ExerciseDetail;