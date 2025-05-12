import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const AirQualityGauge = ({ value = 12.2 }) => {
  // Gauge configuration
  const size = 300;
  const center = size / 2;
  const radius = 110;
  const strokeWidth = 18;
  const startAngle = 0.85 * Math.PI;
  const endAngle = 2.15 * Math.PI;
  const steps = 100;
  
  // Color stops
  const colors = [
    { stop: 0.0, color: "#FACC15" },  // Yellow
    { stop: 0.33, color: "#10B981" }, // Green
    { stop: 0.77, color: "#3B82F6" }, // Blue
    { stop: 1.0, color: "#8B5CF6" }   // Violet
  ];

  // Interpolate color between two colors based on factor
  const interpolateColor = (c1, c2, factor) => {
    const hex = (c) => parseInt(c.slice(1), 16);
    const r1 = (hex(c1) >> 16) & 255, g1 = (hex(c1) >> 8) & 255, b1 = hex(c1) & 255;
    const r2 = (hex(c2) >> 16) & 255, g2 = (hex(c2) >> 8) & 255, b2 = hex(c2) & 255;

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Generate path data for an arc
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (x, y, radius, angle) => {
    return {
      x: x + radius * Math.cos(angle),
      y: y + radius * Math.sin(angle)
    };
  };

  // Calculate indicator position
  const valuePercent = value / 500;
  const angle = startAngle + (endAngle - startAngle) * valuePercent;
  const indicatorPos = polarToCartesian(center, center, radius, angle);

  // Determine status text based on value
  const getStatusText = (val) => {
    if (val < 23) return "Good";
    if (val < 77) return "Moderate";
    return "Poor";
  };

  return (
    <View style={styles.container}>
      <View style={styles.gaugeContainer}>
        <Svg width={size} height={size}>
          {/* Draw gradient arcs */}
          {Array.from({ length: steps }).map((_, i) => {
            const percent = i / steps;
            const angleStart = startAngle + (endAngle - startAngle) * percent;
            const angleEnd = startAngle + (endAngle - startAngle) * (i + 1) / steps;
            
            let color = "#ffffff";
            for (let j = 0; j < colors.length - 1; j++) {
              if (percent >= colors[j].stop && percent <= colors[j + 1].stop) {
                const localFactor = (percent - colors[j].stop) / (colors[j + 1].stop - colors[j].stop);
                color = interpolateColor(colors[j].color, colors[j + 1].color, localFactor);
                break;
              }
            }

            return (
              <Path
                key={i}
                d={describeArc(center, center, radius, angleStart, angleEnd)}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
              />
            );
          })}

          {/* Draw indicator */}
          <Circle
            cx={indicatorPos.x}
            cy={indicatorPos.y}
            r={10}
            fill="transparent"
            stroke="#0b0b0b"
            strokeWidth={4}
          />
        </Svg>

        <View style={styles.gaugeText}>
          <Text style={styles.statusText}>{getStatusText(value)}</Text>
          <Text style={styles.valueText}>{value.toFixed(1)} µg/m³</Text>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugeContainer: {
    position: 'relative',
    width: 300,
    height: 300,
  },
  gaugeText: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    textAlign: 'center',
    pointerEvents: 'none',
  },
  statusText: {
    margin: 0,
    // marginLeft:5,
    textAlign:"center",
    fontSize: 24,
    color: '#81FBB8',
    fontWeight: 'bold',
  },
  valueText: {
    marginTop: 5,
    // marginLeft:10,
    fontSize: 18,
    fontWeight : "bold",
    color: '#ccc',
  },
});

export default AirQualityGauge;