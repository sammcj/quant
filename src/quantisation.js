import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  LineChart,
  Tooltip,
  Legend,
  ReferenceLine,
  BarChart
} from 'recharts';
import * as React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

export const perplexityData = [
  { name: 'F16/BF16', perplexity: 0, compression: 0 },
  { name: 'Q8_0', perplexity: 0.0004, compression: 46.87 },
  { name: 'Q6_K', perplexity: 0.0008, compression: 58.98 },
  { name: 'Q5_K_M', perplexity: 0.0122, compression: 64.55 },
  { name: 'Q5_1', perplexity: 0.0349, compression: 62.46 },
  { name: 'Q5_K_S', perplexity: 0.0400, compression: 65.55 },
  { name: 'Q4_K_M', perplexity: 0.0532, compression: 69.79 },
  { name: 'Q4_K_S', perplexity: 0.0992, compression: 71.50 },
  { name: 'Q3_K_M', perplexity: 0.2496, compression: 75.91 },
  { name: 'Q3_K_S', perplexity: 0.5551, compression: 78.31 },
  { name: 'IQ3_XXS', perplexity: 0.6, compression: 80.35 },
  { name: 'Q2_K', perplexity: 0.6717, compression: 81.52 },
  { name: 'IQ2_XS', perplexity: 0.7, compression: 85.10 },
  { name: 'IQ2_XXS', perplexity: 0.75, compression: 86.56 },
];
export const quantisationChartData = [
  { name: 'F32', size: 100, quality: 100, compression: 0, type: 'Full Precision' },
  { name: 'F16/BF16', size: 53.85, quality: 100, compression: 46.15, type: 'Full Precision' },
  { name: 'Q8_0', size: 30.62, quality: 99.96, compression: 69.38, type: 'Legacy' },
  { name: 'Q6_K', size: 23.62, quality: 99.92, compression: 76.38, type: 'K-quant' },
  { name: 'Q5_K_M', size: 20.5, quality: 98.78, compression: 79.5, type: 'K-quant' },
  { name: 'Q5_1', size: 21.73, quality: 96.51, compression: 78.27, type: 'Legacy' },
  { name: 'Q5_K_S', size: 20.04, quality: 96, compression: 79.96, type: 'K-quant' },
  { name: 'Q4_K_M', size: 17.62, quality: 94.68, compression: 82.38, type: 'K-quant' },
  { name: 'Q4_K_S', size: 16.81, quality: 90.08, compression: 83.19, type: 'K-quant' },
  { name: 'IQ3_M', size: 13.85, quality: 79.02, compression: 88.15, type: 'I-quant' },
  { name: 'Q3_K_M', size: 14.38, quality: 75.04, compression: 85.62, type: 'K-quant' },
  { name: 'Q3_K_S', size: 12.85, quality: 44.49, compression: 87.15, type: 'K-quant' },
  { name: 'IQ3_XXS', size: 11.77, quality: 45, compression: 88.23, type: 'I-quant' },
  { name: 'Q2_K', size: 11.38, quality: 32.83, compression: 88.62, type: 'K-quant' },
  { name: 'IQ2_XS', size: 8.88, quality: 30, compression: 91.12, type: 'I-quant' },
  { name: 'IQ2_XXS', size: 7.92, quality: 25, compression: 92.08, type: 'I-quant' },
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">{label}</p>
        <p>Quality: {payload[0].value.toFixed(2)}%</p>
        <p>Compression: {payload[1].value.toFixed(2)}%</p>
      </div>
    );
  }
  return null;
};

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}%
      </text>
    </g>
  );
};


const AcceptableLabel = ({ x, y, stroke, value, xOffset }) => {
  return (
    <g transform={`translate(${x + xOffset},${y})`}>
      <rect x="575" y="385" width="120" height="25" fill="white" opacity="0.3" rx="5" ry="5" />
      <text x="650" y="400" dy="5" fill={stroke} fontSize="16" textAnchor="middle" fontWeight="500">
        {value}
      </text>
    </g>
  );
};

const GoodLabel = ({ x, y, stroke, value, xOffset }) => {
  return (
    <g transform={`translate(${x + xOffset},${y})`}>
      <rect x="275" y="390" width="120" height="30" fill="white" opacity="1" rx="5" ry="5" />
      <text x="340" y="420" dy="5" fill={stroke} fontSize="16" textAnchor="middle" fontWeight="500">
        {value}
      </text>
    </g>
  );
};


export const QuantisationEfficiencyCharts = () => {
  // correct but not used at present, keep this!
  // const perplexityData = [
  //   { name: 'q2_k', '7B': 14.726, '13B': 11.423, '33B': 15.384, '65B': 15.890 },
  //   { name: 'q3_km', '7B': 4.126, '13B': 3.721, '33B': 4.902, '65B': 4.515 },
  //   { name: 'q4_km', '7B': 0.906, '13B': 0.874, '33B': 1.261, '65B': 1.252 },
  //   { name: 'q5_km', '7B': 0.240, '13B': 0.181, '33B': 0.284, '65B': 0.333 },
  //   { name: 'q6_k', '7B': 0.074, '13B': 0.048, '33B': 0.099, '65B': 0.113 },
  // ];

  const pplPerGBData = [
    { name: 'q2_k', '7B': 0.084201, '13B': 0.030206, '33B': 0.012768, '65B': 0.005661 },
    { name: 'q3_km', '7B': 0.024517, '13B': 0.010225, '33B': 0.004228, '65B': 0.001672 },
    { name: 'q4_km', '7B': 0.005815, '13B': 0.002596, '33B': 0.001176, '65B': 0.000501 },
    { name: 'q5_km', '7B': 0.001661, '13B': 0.000579, '33B': 0.000285, '65B': 0.000144 },
    { name: 'q6_k', '7B': 0.000561, '13B': 0.000166, '33B': 0.000108, '65B': 0.000053 },
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];
  const modelSizes = ['7B', '13B', '33B', '65B'];
  const lineTypes = ['solid', 'dashed', 'dotted', 'dashdot'];
  const markerShapes = ['circle', 'square', 'triangle', 'diamond'];

  // Custom tick formatter for Y-axis
  const formatYAxis = (tickItem) => {
    return tickItem.toFixed(3);
  };


  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">GGUF Quantisation Efficiency vs Quality Across Model Sizes</h2>

      {/* Perplexity Percent Chart */}
      <div className="w-full h-[520px] mb-8">
        <h3 className="text-xl font-bold mb-2 text-center">Perplexity Added (Per GB Saved) in Quantisation</h3>
        <ResponsiveContainer width="100%" height="95%">
          <LineChart data={pplPerGBData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} style={{ fontSize: '16px', fontWeight: '500' }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[1, 0]} scale="linear" tickCount={20}>
              {/* <YAxis type="number" domain={['datamax', 1]} scale="linear" tickCount={10}> */}
              <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} offset={-10}>
                Perplexity Added (Per GB Saved)
              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            {modelSizes.map((size, index) => (
              <Line
                key={size}
                type="monotone"
                dataKey={size}
                stroke={colors[index]}
                strokeWidth={2}
                dot={{ r: 5, fill: colors[index], shape: markerShapes[index] }}
                strokeDasharray={lineTypes[index] === 'solid' ? undefined : lineTypes[index] === 'dotted' ? '1 3' : '5 5'}
                name={size}
                connectNulls
                tickFormatter={formatYAxis}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Perplexity Per GB Chart */}
      <div className="w-full h-[500px]">
        <h3 className="text-xl font-bold mb-2 text-center">Perplexity Added (Per GB Saved) in Quantisation</h3>
        <ResponsiveContainer width="100%" height="95%">
          <BarChart
            data={pplPerGBData}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            barGap='0'
            barCategoryGap='8%'
            style={{ fontSize: '16px', fontWeight: '500' }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={['dataMin', 'dataMax']} scale="log">
              <Label
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle' }}
                offset={-20}
              >
                Perplexity Increase per 1GB - Log Scale

              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            {modelSizes.map((size, index) => (
              <Bar key={size} dataKey={size} fill={colors[index]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div >
  );
};


export const PerplexityChart = () => (
  <div className="w-full h-[500px] md:h-[710px] p-4 bg-white rounded-lg shadow-lg">
    <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Perplexity Increase vs Compression</h2>
    <h3 className="text-sm md:text-m mb-4 text-center">Lower <span className="text-purple-500">perplexity</span> is better, Higher <span className="text-green-500">compression</span> is better</h3>
    <h4 className="text-xs md:text-s mb-4 text-center">A perplexity of 0.01% or lower is ideal, 0.05% or less is generally considered acceptable.</h4>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        data={perplexityData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        style={{ fontSize: '12px', fontWeight: '500' }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={80} />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="perplexity"
          name="Δ Perplexity"
          stroke="#8884d8"
          strokeWidth={3}
          dot={{ strokeWidth: 5 }}
        />
        <Line yAxisId="right" type="monotone" dataKey="compression" name="Compression (%)" stroke="#82ca9d" strokeWidth={1.5} dot={{ strokeWidth: 2 }} />
        <ReferenceLine y={0.01} yAxisId="left" stroke="red" strokeDasharray="3 3" />
        <ReferenceLine y={0.05} yAxisId="left" stroke="orange" strokeDasharray="3 3" />
        <ReferenceLine y={0.01} yAxisId="left" stroke="none" label={<GoodLabel stroke="red" value="Ideal (<0.01)" />} />
        <ReferenceLine y={0.05} yAxisId="left" stroke="none" label={<AcceptableLabel stroke="orange" value="Acceptable (<0.05)" />} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);



export const QuantisationChart = () => (
  <div className="w-full h-[650px] p-4 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">GGUF Quality vs Compression</h2>
    <ResponsiveContainer width="100%" height="95%">
      <ComposedChart
        data={quantisationChartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        style={{ fontSize: '14px' }}
      >
        <CartesianGrid strokeDasharray="2 5" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={40} />
        <YAxis
          yAxisId="left"
          orientation="left"
          scale="linear"
          domain={[10, 100]}
          ticks={[40, 60, 80, 90, 95, 99, 100]}
          tick={<CustomYAxisTick />}
        >
          <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }}>
            Quality (%)
          </Label>
        </YAxis>
        <YAxis yAxisId="right" orientation="right" domain={[0, 100]}>
          <Label angle={90} position="insideRight" style={{ textAnchor: 'middle' }}>
            Compression (%)
          </Label>
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Bar yAxisId="left" dataKey="quality" name="Quality (%)" fill="#8884d8" />
        <Line yAxisId="right" type="monotone" dataKey="compression" name="Compression (%)" stroke="#82ca9d" strokeWidth={2} dot={{ strokeWidth: 2 }} />
        <ReferenceLine y={95} yAxisId="left" label={{ value: '95% Quality', position: 'right' }} stroke="orange" strokeWidth="1" />
        <ReferenceLine y={99} yAxisId="left" label={{ value: '99% Quality', position: 'right' }} stroke="purple" strokeWidth="2" />
      </ComposedChart>
    </ResponsiveContainer>
    <p className="mt-4 text-sm">
      Purple bars represent quality, while the green line shows compression percentage.
      A quality of 98% or higher is ideal, 95% or higher is generally considered acceptable.
      IQ quants generally offer better quality-to-size ratios but may be slower on Metal/CPU.
    </p>
  </div>
);



export const DecisionTree = () => (
  <div className="w-full overflow-x-auto p-4 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">GGUF Quantisation Decision Tree</h2>
    <div className="min-w-[800px]"> {/* Set a minimum width to prevent squishing on small screens */}
      <Tree
        lineWidth={'2px'}
        lineColor={'#bbb'}
        lineBorderRadius={'10px'}
        label={<div className="p-2 rounded-lg bg-blue-500 text-xl text-white font-bold">Start</div>}
      >
        <TreeNode label={<div className="p-2 rounded-lg text-xl font-bold text-black bg-blue-300">Prioritise Quality or Size?</div>}>
          <TreeNode label={<div className="p-2 rounded-lg text-l font-bold text-black bg-blue-300">Quality:</div>}>
            <TreeNode label={<div className="p-2 rounded-lg bg-green-700 text-white">Enough VRAM for Q6_K?</div>}>
              <TreeNode label={<div className="p-2 rounded-lg bg-green-600 text-white">No: Enough VRAM for Q5_K_M or Q4_K_M?</div>}>
                <TreeNode label={<div className="p-2 rounded-lg bg-green-300">No: Enough VRAM for Q3_K_M or IQ3_M?</div>}>
                  <TreeNode label={<div className="p-2 bg-green-200 text-black">Yes: Metal - Use Q3_K_M</div>} />
                  <TreeNode label={<div className="p-2 bg-green-300 text-black">Yes: CUDA - Use IQ3_M</div>} />
                  <TreeNode label={<div className="p-2 rounded-lg bg-gray-200">No: Is the model larger than 40b?</div>}>
                    <TreeNode label={<div className="p-2 rounded-lg bg-orange-400">Yes: Enough VRAM for IQ2_XS (slower on Metal)?</div>}>
                      <TreeNode label={<div className="p-2 bg-red-500 text-white">No: Pick a smaller model!</div>} />
                    </TreeNode>
                    <TreeNode label={<div className="p-2 bg-red-500 text-white">No: Pick a smaller model!</div>} />
                  </TreeNode>
                </TreeNode>
              </TreeNode>
            </TreeNode>
          </TreeNode>
          <TreeNode label={<div className="p-2 rounded-lg text-l font-bold text-black bg-blue-300">Size:</div>}>
            <TreeNode label={<div className="p-2 rounded-lg bg-green-600 text-white">Enough VRAM for Q4_K_M?</div>}>
              <TreeNode label={<div className="p-2 rounded-lg bg-green-300">Enough VRAM for Q3_K_M or IQ3_M?</div>}>
                <TreeNode label={<div className="p-2 bg-green-200 text-black">Yes: Metal - Use Q3_K_M</div>} />
                <TreeNode label={<div className="p-2 bg-green-300 text-black">Yes: CUDA - Use IQ3_M</div>} />
                <TreeNode label={<div className="p-2 rounded-lg bg-gray-200">No: Is the model larger than 40b?</div>}>
                  <TreeNode label={<div className="p-2 bg-red-500 text-white">No: Pick a smaller model!</div>} />
                  <TreeNode label={<div className="p-2 rounded-lg bg-orange-300">Yes: Enough VRAM for IQ2_XS?</div>}>
                    <TreeNode label={<div className="p-2 rounded-lg bg-gray-200">No: Is the model larger than 70b?</div>}>
                      <TreeNode label={<div className="p-2 rounded-lg bg-orange-600 text-white">Yes: Enough VRAM for IQ2_XXS and desperate?</div>}>
                        <TreeNode label={<div className="p-2 bg-red-500 text-white">No: Pick a smaller model!</div>} />
                      </TreeNode>
                    </TreeNode>
                  </TreeNode>
                </TreeNode>
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  </div>
);

// Updated QuantisationSpectrum component
export const QuantisationSpectrum = () => (
  <div className="w-full p-4 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">GGUF Quantisation Spectrum</h2>
    <div className="relative h-40 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg">
      <div className="absolute top-full left-0 mt-2">Low Precision</div>
      <div className="absolute top-full right-0 mt-2">High Precision</div>
      <div className="absolute -top-8 left-[2%]">IQ2_XXS</div>
      <div className="absolute -top-8 left-[10%]">IQ2_XS</div>
      <div className="absolute -top-8 left-[18%]">Q2_K</div>
      <div className="absolute -top-8 left-[26%]">IQ3_XXS</div>
      <div className="absolute -top-8 left-[34%]">Q3_K_S</div>
      <div className="absolute -top-8 left-[42%]">Q3_K_M</div>
      <div className="absolute -top-8 left-[50%]">Q4_K_S</div>
      <div className="absolute -top-8 left-[58%]">Q4_K_M</div>
      <div className="absolute -top-8 left-[66%]">Q5_K_S</div>
      <div className="absolute -top-8 left-[74%]">Q5_K_M</div>
      <div className="absolute -top-8 left-[82%]">Q6_K</div>
      <div className="absolute -top-8 left-[90%]">Q8_0</div>
      <div className="absolute -bottom-16 left-[10%]">Smallest Size</div>
      <div className="absolute -bottom-16 right-[10%]">Highest Quality</div>
      <div className="absolute top-8 left-0 w-full text-center">Performance on Metal/CPU</div>
      <div className="absolute top-16 left-[2%] w-[24%] h-4 bg-red-300 rounded"></div>
      <div className="absolute top-16 left-[26%] w-[72%] h-4 bg-green-300 rounded"></div>
      <div className="absolute top-24 left-0 w-full text-center">Performance on CUDA</div>
      <div className="absolute top-32 left-0 w-full h-4 bg-green-300 rounded"></div>
    </div>
  </div>
);


// Updated QuantisationSweetSpots with additional VRAM sizes
const QuantisationSweetSpots = () => {
  const modelSizes = ['3B', '8B', '14B', '30B', '50B', '70B', '110B'];
  const vramSizes = ['8GB', '12GB', '16GB', '20GB', '24GB', '32GB', '48GB', '64GB'];

  const getRecommendation = (modelSize, vramSize) => {
    const modelIndex = modelSizes.indexOf(modelSize);
    const vramIndex = vramSizes.indexOf(vramSize);

    if (vramIndex >= modelIndex + 3) return { content: 'Q6_K', bgColor: 'bg-green-300' };
    if (vramIndex >= modelIndex + 2) return { content: 'Q5_K_M', bgColor: 'bg-green-200' };
    if (vramIndex >= modelIndex + 1) return { content: 'Q4_K_M', bgColor: 'bg-green-200' };
    if (vramIndex === modelIndex) return { content: 'IQ3_M', bgColor: 'bg-yellow-200' };
    if (vramIndex === modelIndex - 1) return { content: 'IQ2_XXS', bgColor: 'bg-yellow-200' };
    return { content: 'N/A', bgColor: 'bg-red-200' };
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">GGUF Quantisation Sweet Spots (8K Context)</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="border p-2">Model Size</th>
            {vramSizes.map(vram => (
              <th key={vram} className="border p-2">{vram} VRAM</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modelSizes.map(modelSize => (
            <tr key={modelSize}>
              <td className="border p-2 font-bold">{modelSize}</td>
              {vramSizes.map(vramSize => {
                const { content, bgColor } = getRecommendation(modelSize, vramSize);
                return (
                  <td key={`${modelSize}-${vramSize}`} className={`border p-2 ${bgColor} text-center`}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm">
        <p><span className="inline-block w-4 h-4 bg-green-200 mr-2"></span> Recommended</p>
        <p><span className="inline-block w-4 h-4 bg-yellow-200 mr-2"></span> Might be possible but depends on use case</p>
        <p><span className="inline-block w-4 h-4 bg-red-200 mr-2"></span> Not recommended / Not possible</p>
      </div>
      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Right-sizing model quantisation for your (v)RAM</h2>
        <ul className="list-disc list-inside">
          <li>You have to weigh the trade-offs between model size, quality, and performance when choosing a quantisation level.</li>
          <li>Higher quantisation levels offer smaller model sizes but may sacrifice quality and performance, or may not fit completely in your (v)RAM.</li>
          <li>Remember that the size of the context window (e.g., 8K, 16K, 32K) you set when loading the model will greatly affect the model size and the (v)RAM requirements.</li>
        </ul>
      </div>
    </div >
  );
};



const TableSpectrum = () => {
  const getColorClass = (value, metric, legacy = false) => {
    // If the quant is a legacy type (Q4_0, Q5_1, etc. without K or IQ), return a gray background
    if (legacy) return 'bg-gray-100';
    if (metric === 'size') {
      const sizeMap = {
        'Smallest': 'bg-green-100',
        'Very Small': 'bg-green-200',
        'Small': 'bg-green-300',
        'Medium-Small': 'bg-green-400',
        'Medium': 'bg-green-500',
        'Medium-Large': 'bg-green-600',
        'Large': 'bg-green-700',
        'Very Large': 'bg-green-800',
        'Big Chungus': 'bg-green-900'
      };
      return sizeMap[value] || 'bg-gray-100';
    } else if (metric === 'quality') {
      const qualityMap = {
        'Unusable': 'bg-red-400',
        'Very-Very-Low': 'bg-red-300',
        'Very-Low': 'bg-red-200',
        'Low': 'bg-red-100',
        'Low-Medium': 'bg-orange-200',
        'Medium-Low': 'bg-lime-100',
        'Medium': 'bg-green-300',
        'Medium-High': 'bg-green-400',
        'High': 'bg-green-300',
        'Very-High': 'bg-green-500',
        'Overkill': 'bg-green-600'
      };
      return qualityMap[value] || 'bg-gray-100';
    } else if (metric === 'performance') {
      const perfMap = {
        'Poor': 'bg-red-200',
        'Not Great': 'bg-orange-200',
        'OK': 'bg-orange-100',
        'Good': 'bg-yellow-200',
        'Very Good': 'bg-lime-200',
        'Excellent': 'bg-green-300',
      };
      return perfMap[value] || 'bg-gray-100';
    }
    return 'bg-gray-100';
  };

  const quantData = [
    { name: 'IQ1_XS', size: 'Smallest', quality: 'Unusable', cudaPerf: 'Excellent', metalPerf: 'OK', notes: 'Basically a jabbering idiot' },
    { name: 'Q2_K_S', size: 'Smallest', quality: 'Unusable', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'Likely generates lots of errors, not very useful' },
    { name: 'Q2_K_M', size: 'Smallest', quality: 'Very-Very-Low', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'Likely generates lots of errors, not very useful' },
    { name: 'IQ2_XXS', size: 'Very Small', quality: 'Very-Low', cudaPerf: 'Excellent', metalPerf: 'OK', notes: 'Surprisingly usable for the GPU poor if you have CUDA' },
    { name: 'IQ2_XS', size: 'Very Small', quality: 'Low', cudaPerf: 'Very Good', metalPerf: 'Not Great', notes: 'Surprisingly usable for the GPU poor if you have CUDA' },
    { name: 'Q3_K_S', size: 'Small', quality: 'Low', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'Usable and quick but has had a few head injuries' },
    { name: 'Q4_0', size: 'Small', quality: 'Medium-Low', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'Legacy Quant Type - Not recommended', legacy: true },
    { name: 'IQ3_XXS', size: 'Small', quality: 'Medium-Low', cudaPerf: 'Very Good', metalPerf: 'Poor', notes: 'As good as K4_K_S but smaller' },
    { name: 'Q4_K_S', size: 'Medium-Small', quality: 'Medium-Low', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'You may as well use Q4_K_M, or IQ3_X(X)S if you have CUDA' },
    { name: 'Q5_1', size: 'Medium', quality: 'Medium-Low', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'Legacy Quant Type - Not recommended', legacy: true },
    { name: 'Q4_K_M', size: 'Medium', quality: 'Medium', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'Balanced mid range quant' },
    { name: 'Q5_K_S', size: 'Medium-Large', quality: 'Medium', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'Slightly better than Q4_K_M' },
    { name: 'Q5_K_M', size: 'Medium-Large', quality: 'Medium-High', cudaPerf: 'Excellent', metalPerf: 'Excellent', notes: 'A nice little upgrade from Q4_K_M' },
    { name: 'Q6_K', size: 'Large', quality: 'Very-High', cudaPerf: 'Very Good', metalPerf: 'Very Good', notes: 'Best all-rounder, quality-to-size ratio for systems with enough VRAM' },
    { name: 'Q8_0', size: 'Very Large', quality: 'Overkill', cudaPerf: 'Good', metalPerf: 'Good', notes: 'Large file size, usually overkill and practically indistinguishable from full precision for inference' },
  ];


  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">GGUF Quantisation Spectrum Heatmap</h2>
      <h3 className="text-sm md:text-m mb-4 text-center">Common quantisation types and their relative size, quality, and performance</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Quant Type</th>
              <th className="border p-2">Size</th>
              <th className="border p-2">Quality</th>
              <th className="border p-2">Performance (CUDA)</th>
              <th className="border p-2">Performance (Metal)</th>
              <th className="border p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {quantData.map((quant) => (
              <tr key={quant.name}>
                <td className="border p-2 text-l font-semibold ">{quant.name}</td>
                <td className={`border p-2 text-l ${getColorClass(quant.size, 'size', quant.legacy)}`}>{quant.size}</td>
                <td className={`border p-2 text-l ${getColorClass(quant.quality, 'quality', quant.legacy)}`}>{quant.quality}</td>
                <td className={`border p-2 text-l ${getColorClass(quant.cudaPerf, 'performance', quant.legacy)}`}>{quant.cudaPerf}</td>
                <td className={`border p-2 text-l ${getColorClass(quant.metalPerf, 'performance', quant.legacy)}`}>{quant.metalPerf}</td>
                <td className="border p-2 text-s">{quant.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Understanding GGUF Quantisation</h2>
        <p className="mb-2">GGUF quantisation is a technique used to reduce the size and memory footprint of large language models while attempting to maintain performance. Here are some key points to remember:</p>
        <ul className="list-disc list-inside">
          <li>Quants without IQ or K (e.g. Q4_0, Q5_1) are <i>legacy</i> and not recommended, use K-quants instead</li>
          <br></br>
          <li>IQ-quants offer better quality-to-size ratios but may have slower CPU/Metal performance.</li>
          <li>K-quants provide a good balance of quality, size, and performance across different hardware.</li>
          <br></br>
          <li>Higher number quants (e.g., Q6_K) offer better quality but at the cost of larger file sizes.</li>
          <li>Q8_K and higher are generally overkill for inference and may not offer noticeable quality improvements over Q6_K.</li>
          <br></br>
          <li>The larger the model parameters, the more usable it is likely to be at lower quantisation levels.</li>
          <li>Always consider your specific hardware capabilities and quality requirements when choosing a quantisation type.</li>
        </ul>
      </div>
    </div>
  );
};

// Update the main component to include new visualisations
export const QuantisationVisualisations = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">GGUF Quantisation Visualisations</h1>
    <div className="mt-8 p-4 bg-blue-100 rounded-lg">
      <h2 className="text-lg md:text-xl font-bold mb-2">Insights on Quantisation and Model Size</h2>
      <ul className="list-disc list-inside text-sm md:text-base">
        <li>Larger models still show perplexity increases with quantisation, but the relative impact varies across model sizes.</li>
        <li>The efficiency of quantisation (perplexity increase per GB saved) improves significantly as model size increases.</li>
        <li>For smaller models (e.g., 7B), the jump from Q4 to Q3 quantisation results in a more significant perplexity increase compared to larger models.</li>
        <li>Q6_K quantisation consistently provides excellent quality across all model sizes, with minimal perplexity increase.</li>
        <li>The benefits of using higher quality quantisation (e.g., Q5_KM vs Q6_K) diminish for larger models, potentially allowing for more aggressive compression without significant quality loss.</li>
      </ul>
    </div>
    <div className="space-y-8 md:space-y-14">
      <PerplexityChart />
      <TableSpectrum />
      <QuantisationSweetSpots />
      <QuantisationEfficiencyCharts />
      <DecisionTree />
    </div>
  </div>
);
