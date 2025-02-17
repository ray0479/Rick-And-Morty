import { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import * as d3 from 'd3';
import './reports.css'

const Reports = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [difficultFilter, setDificult] = useState("")
  const [typeHero, setTypeHero] = useState("")

  useEffect(() => {
    d3.csv("data/LoL_champion_data.csv").then((csvData) => {
        setData(csvData)
    })
    setFiltered(data.filter(d => d.herotype === typeHero && d.difficulty === difficultFilter))
    drawPieChart(filtered.length, data.length);
    drawBarChart(filtered, data, difficultFilter)
  }, [data, difficultFilter, typeHero]);

  const handleImpress = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    const formData = new FormData(event.target);
    const type = formData.get('heroType');
    const difficult = formData.get('difficulty');
    setFiltered(data.filter(d => d.herotype === type && d.difficulty === difficult))
    if (filtered.length === 0) alert('SIN DATOS')
    else{
        doc.text(`INFORME - Filtro aplicado: [TIPO: ${typeHero}, DIFICULTAD: ${difficultFilter}]`, 10, 10);
        doc.text("Nombre", 10, 25);
        doc.text("Dificultad", 70, 25);
        doc.text("Tipo", 122, 25);
        doc.text("_______________________________________________", 10, 27);
        filtered.forEach((d, index) => {
            
            doc.text(d.apiname, 10, 15 * index + 35);
            doc.text(d.herotype, 120, 15 * index + 35);
            doc.text(d.difficulty, 80, 15 * index + 35);
        })
        doc.save("campeones.pdf")
    }
  }

  const drawPieChart = (filteredCount, totalCount, ) => {
    d3.select("#pieChart").selectAll("*").remove(); // Limpiar gráfico anterior

    if (filteredCount === 0) return; // No hay nada que dibujar

    const width = 200, height = 200, radius = Math.min(width, height) / 2;
    const svg = d3.select("#pieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = [
      { label: "Filtrados", value: filteredCount },
      { label: "Total", value: totalCount - filteredCount }
    ];

    const color = d3.scaleOrdinal(["#ff7f0e", "#1f77b4"]);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px");
  };

  const drawBarChart = (filteredData, totalData) => {
    d3.select("#barChart").selectAll("*").remove(); // Limpiar gráfico anterior

    // Contar campeones por tipo de héroe
    const heroTypes = ["Tank", "Fighter", "Support"];
    const counts = heroTypes.map(type => totalData.filter(d => d.herotype === type).length);

    const width = 400, height = 300;
    const svg = d3.select("#barChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3.scaleBand()
      .domain(heroTypes)
      .range([50, width - 50])
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...counts)])
      .range([height - 50, 50]);

    // Definir colores para cada tipo de héroe
    const colorScale = d3.scaleOrdinal()
      .domain(heroTypes)
      .range(["#4CAF50", "#FF9800", "#2196F3"]); // Verde, Naranja, Azul

    // Dibujar ejes
    svg.append("g")
      .attr("transform", `translate(0, ${height - 50})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", "translate(50,0)")
      .call(d3.axisLeft(yScale));

    // Dibujar barras de total
    svg.selectAll(".bar")
      .data(heroTypes)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d))
      .attr("y", d => yScale(totalData.filter(champ => champ.herotype === d).length))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - 50 - yScale(totalData.filter(champ => champ.herotype === d).length))
      .attr("fill", d => colorScale(d)); // Aplicar color según el tipo de héroe
  
  };

  return (
    <div className='reports-page'>
      
      <h1>Generación de Informes</h1>
      <form className='report-form' onSubmit={handleImpress}>
        <div className="selects">
            <select className='select-reports' value={difficultFilter} onChange={(e) => setDificult(e.target.value)}>
                <option>Seleccionar Dificultad</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <select className='select-reports' value={typeHero} onChange={(e) => setTypeHero(e.target.value)}>
                <option>Tipo de héroe</option>
                <option>Tank</option>
                <option>Fighter</option>
                <option>Support</option>
            </select>
            <button className='impress' type="submit">Imprimir</button>
        </div>
        <div className='data-analisys'>
          <div className='campeones'>
        {filtered.length === 0 && data.length > 0 ? (
            <ul>
                {data.map((row, index) => (
                <li key={index}>{row.apiname} - {row.herotype} - {row.difficulty}</li>
                ))}
            </ul>
            ) : (
            <p></p>
            )}
            
        {filtered.length > 0 ? (
            <ul>
                {filtered.map((row, index) => (
                <li key={index}>{row.apiname} - {row.herotype} - {row.difficulty}</li>
                ))}
            </ul>
            ) : (
            <p>Cargando datos...</p>
        )}
        </div>
        <div id="pieChart"></div>
        <div id="barChart"></div>
        </div>
        
      </form>

      
      
    </div>
  );
};

export default Reports;
