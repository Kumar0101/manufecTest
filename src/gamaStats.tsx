import React from 'react';
import dataset from './data/dataSet.json';

interface DataItem {
  [key: string]: string | number;
}

// Utility function to calculate the mean
const calculateMean = (data: number[]): number => {
  const sum = data.reduce((acc, item) => acc + item, 0);
  const mean = sum / data.length;
  return Number(mean.toFixed(3));
};

// Utility function to calculate the median
const calculateMedian = (data: number[]): number => {
  const sortedData = [...data].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedData.length / 2);
  let median: number;

  if (sortedData.length % 2 === 0) {
    median = (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
  } else {
    median = sortedData[middleIndex];
  }

  return Number(median.toFixed(3));
};

// Utility function to calculate the mode
const calculateMode = (data: number[]): number | null => {
  const counts: { [key: number]: number } = {};
  let maxCount = 0;
  let mode: number | null = null;

  data.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
    if (counts[item] > maxCount) {
      maxCount = counts[item];
      mode = item;
    }
  });

  return mode;
};

const calculateGammaStatistics = (): { [key: string]: { mean: number; median: number; mode: number | null } } => {
  const datasetWithGamma = dataset.map((item: DataItem) => {
    const ash = item['Ash'] as number;
    const hue = item['Hue'] as number;
    const magnesium = item['Magnesium'] as number;
    const gamma = (ash * hue) / magnesium;
    return { ...item, Gamma: gamma };
  });

  const classesStatistics: { [key: string]: { mean: number; median: number; mode: number | null } } = {};

  datasetWithGamma.forEach((item: DataItem) => {
    const classKey = item['Alcohol'].toString();
    if (!classesStatistics[classKey]) {
      const classData: number[] = datasetWithGamma
        .filter((dataItem: DataItem) => dataItem['Alcohol'].toString() === classKey)
        .map((dataItem: DataItem) => dataItem['Gamma'] as number);

      classesStatistics[classKey] = {
        mean: calculateMean(classData),
        median: calculateMedian(classData),
        mode: calculateMode(classData),
      };
    }
  });

  return classesStatistics;
};

const GammaStatistics: React.FC = () => {
  const classesStatistics = calculateGammaStatistics();
  const classes = Object.keys(classesStatistics);

  return (
   <div className='meanTable'>
    <h2>Mean , Median & Mode (Gama) </h2>
     <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classes.map((classKey: string) => (
            <th key={classKey}>Class {classKey}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gama Mean</td>
          {classes.map((classKey: string) => (
            <td key={classKey}>{classesStatistics[classKey].mean.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>Gama Median</td>
          {classes.map((classKey: string) => (
            <td key={classKey}>{classesStatistics[classKey].median.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>Gama Mode</td>
          {classes.map((classKey: string) => (
            <td key={classKey}>
                {classesStatistics[classKey].mode === null ? '-' : classesStatistics[classKey].mode?.toFixed(3)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
   </div>
  );
};

export default GammaStatistics;
