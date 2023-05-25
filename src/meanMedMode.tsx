import React from 'react';
import dataset from './data/dataSet.json'; // Assuming the JSON file is named "data.json" and located in the same directory

interface DataItem {
  [key: string]: string | number;
}

// Utility function to calculate the mean
const calculateMean = (data: number[]): number => {
   const filteredData = data.filter(item => typeof item === 'number');
    if (filteredData.length === 0) {
      return 0; // Return 0 or any default value if all values are non-numeric
    }
    const sum = filteredData.reduce((acc, item) => acc + item, 0);
    return sum / filteredData.length;
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

const FlavanoidsStatistics: React.FC = () => {
  const classesMean: { [key: string]: number } = {};
  const classesMedian: { [key: string]: number } = {};
  const classesMode: { [key: string]: number | null } = {};

  dataset.forEach((item: DataItem) => {
    const classKey = item['Alcohol'].toString();
    if (!classesMean[classKey]) {
      const classData: number[] = dataset
        .filter((dataItem: DataItem) => dataItem['Alcohol'].toString() === classKey)
        .map((dataItem: DataItem) => dataItem['Flavanoids'] as number);

      classesMean[classKey] = calculateMean(classData);
      classesMedian[classKey] = calculateMedian(classData);
      classesMode[classKey] = calculateMode(classData);
    }
  });

  const classes = Object.keys(classesMean);

  return (
<div className='meanTable'>
    <h2>Mean Median Mode (Flavanoids) </h2>
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
          <td> Flavanoids Mean</td>
          {classes.map((classKey: string) => (
            <td key={classKey}>{classesMean[classKey].toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {classes.map((classKey: string) => (
            <td key={classKey}>{classesMedian[classKey].toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td> Flavanoids Mode</td>
          {classes.map((classKey: string) => (
            <td key={classKey}>{classesMode[classKey] !== null ? classesMode[classKey]?.toFixed(3) : '-'}</td>
          ))}
        </tr>
      </tbody>
    </table>
</div>
  );
};

export default FlavanoidsStatistics;
