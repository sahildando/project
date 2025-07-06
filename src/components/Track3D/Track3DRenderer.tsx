import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Track3DRendererProps {
  trackData: any;
  viewMode: 'overview' | 'detailed' | 'technical';
  showLayers: {
    track: boolean;
    elevation: boolean;
    facilities: boolean;
    drsZones: boolean;
    sectors: boolean;
    corners: boolean;
    barriers: boolean;
    lighting: boolean;
  };
  cameraPosition: { x: number; y: number; z: number; rotation: number };
  zoom: number;
  isRotating: boolean;
  onCornerClick?: (corner: any) => void;
}

const Track3DRenderer: React.FC<Track3DRendererProps> = ({
  trackData,
  viewMode,
  showLayers,
  cameraPosition,
  zoom,
  isRotating,
  onCornerClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [renderStats, setRenderStats] = useState({ fps: 0, triangles: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let lastTime = 0;
    let frameCount = 0;
    let lastFpsUpdate = 0;

    const render = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Calculate camera transformation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = zoom * Math.min(rect.width, rect.height) / 1000;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      ctx.rotate(cameraPosition.rotation * Math.PI / 180);

      // Render track components based on layers
      if (showLayers.track) {
        renderTrackSurface(ctx, trackData, viewMode);
      }

      if (showLayers.barriers) {
        renderBarriers(ctx, trackData);
      }

      if (showLayers.elevation) {
        renderElevationChanges(ctx, trackData);
      }

      if (showLayers.drsZones) {
        renderDRSZones(ctx, trackData);
      }

      if (showLayers.sectors) {
        renderSectors(ctx, trackData);
      }

      if (showLayers.corners) {
        renderCorners(ctx, trackData, onCornerClick);
      }

      if (showLayers.facilities) {
        renderFacilities(ctx, trackData);
      }

      if (showLayers.lighting) {
        renderLighting(ctx, trackData);
      }

      ctx.restore();

      // Update FPS counter
      frameCount++;
      if (currentTime - lastFpsUpdate > 1000) {
        setRenderStats(prev => ({
          ...prev,
          fps: Math.round(frameCount * 1000 / (currentTime - lastFpsUpdate))
        }));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      if (isRotating) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trackData, viewMode, showLayers, cameraPosition, zoom, isRotating, onCornerClick]);

  const renderTrackSurface = (ctx: CanvasRenderingContext2D, track: any, mode: string) => {
    if (!track.corners_data) return;

    // Create track path
    const path = new Path2D();
    const corners = track.corners_data;
    
    // Main racing line
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw track surface with realistic width
    corners.forEach((corner: any, index: number) => {
      const x = corner.x * 4;
      const y = corner.y * 4;
      
      if (index === 0) {
        path.moveTo(x, y);
      } else {
        // Add smooth curves between corners
        const prevCorner = corners[index - 1];
        const prevX = prevCorner.x * 4;
        const prevY = prevCorner.y * 4;
        
        const cpX = (prevX + x) / 2;
        const cpY = (prevY + y) / 2;
        path.quadraticCurveTo(cpX, cpY, x, y);
      }
    });

    // Close the track
    if (corners.length > 0) {
      const firstCorner = corners[0];
      path.lineTo(firstCorner.x * 4, firstCorner.y * 4);
    }

    ctx.stroke(path);

    // Add track surface texture
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 8;
    ctx.stroke(path);

    // Racing line
    ctx.strokeStyle = '#e53e3e';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke(path);
    ctx.setLineDash([]);

    // Track boundaries
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke(path);
  };

  const renderBarriers = (ctx: CanvasRenderingContext2D, track: any) => {
    if (!track.corners_data) return;

    const corners = track.corners_data;
    
    // Outer barriers
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 3;
    
    corners.forEach((corner: any, index: number) => {
      const x = corner.x * 4;
      const y = corner.y * 4;
      const nextCorner = corners[(index + 1) % corners.length];
      const nextX = nextCorner.x * 4;
      const nextY = nextCorner.y * 4;
      
      // Calculate perpendicular offset for barriers
      const dx = nextX - x;
      const dy = nextY - y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const offsetX = (-dy / length) * 15;
      const offsetY = (dx / length) * 15;
      
      // Outer barrier
      ctx.beginPath();
      ctx.moveTo(x + offsetX, y + offsetY);
      ctx.lineTo(nextX + offsetX, nextY + offsetY);
      ctx.stroke();
      
      // Inner barrier
      ctx.beginPath();
      ctx.moveTo(x - offsetX, y - offsetY);
      ctx.lineTo(nextX - offsetX, nextY - offsetY);
      ctx.stroke();
    });
  };

  const renderElevationChanges = (ctx: CanvasRenderingContext2D, track: any) => {
    if (!track.corners_data) return;

    track.corners_data.forEach((corner: any) => {
      const x = corner.x * 4;
      const y = corner.y * 4;
      const elevation = corner.z || 0;
      
      // Color based on elevation
      const intensity = Math.abs(elevation) / 50;
      const color = elevation > 0 
        ? `rgba(239, 68, 68, ${Math.min(intensity, 0.8)})` 
        : `rgba(59, 130, 246, ${Math.min(intensity, 0.8)})`;
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, Math.abs(elevation) * 0.5 + 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Elevation indicator
      if (Math.abs(elevation) > 5) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${elevation > 0 ? '+' : ''}${elevation}m`, x, y - 15);
      }
    });
  };

  const renderDRSZones = (ctx: CanvasRenderingContext2D, track: any) => {
    if (!track.drs_zones || !track.corners_data) return;

    track.drs_zones.forEach((drs: any) => {
      const startCorner = track.corners_data[drs.start] || track.corners_data[0];
      const endCorner = track.corners_data[drs.end] || track.corners_data[track.corners_data.length - 1];
      
      if (startCorner && endCorner) {
        const startX = startCorner.x * 4;
        const startY = startCorner.y * 4;
        const endX = endCorner.x * 4;
        const endY = endCorner.y * 4;
        
        // DRS zone highlighting
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, 'rgba(72, 187, 120, 0.3)');
        gradient.addColorStop(1, 'rgba(72, 187, 120, 0.7)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // DRS zone label
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        ctx.fillStyle = '#48bb78';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`DRS ${drs.number}`, midX, midY);
      }
    });
  };

  const renderSectors = (ctx: CanvasRenderingContext2D, track: any) => {
    if (!track.sectors_data) return;

    const sectorColors = ['#f56565', '#48bb78', '#4299e1'];
    
    track.sectors_data.forEach((sector: any, index: number) => {
      ctx.strokeStyle = sectorColors[index % 3];
      ctx.lineWidth = 3;
      ctx.setLineDash([15, 10]);
      
      // Draw sector boundary lines
      const sectorY = -200 + (index * 60);
      ctx.beginPath();
      ctx.moveTo(-300, sectorY);
      ctx.lineTo(300, sectorY);
      ctx.stroke();
      
      // Sector label
      ctx.fillStyle = sectorColors[index % 3];
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Sector ${sector.number}`, -290, sectorY - 5);
      ctx.font = '10px Arial';
      ctx.fillText(sector.length, -290, sectorY + 10);
      
      ctx.setLineDash([]);
    });
  };

  const renderCorners = (ctx: CanvasRenderingContext2D, track: any, onClick?: (corner: any) => void) => {
    if (!track.corners_data) return;

    track.corners_data.forEach((corner: any) => {
      const x = corner.x * 4;
      const y = corner.y * 4;
      
      // Corner marker based on type
      const cornerColors = {
        left: '#f56565',
        right: '#4299e1',
        chicane: '#ed8936'
      };
      
      ctx.fillStyle = cornerColors[corner.type as keyof typeof cornerColors] || '#718096';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Corner number
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(corner.number.toString(), x, y + 4);
      
      // Banking indicator
      if (corner.banking && Math.abs(corner.banking) > 0) {
        ctx.strokeStyle = corner.banking > 0 ? '#f6ad55' : '#63b3ed';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Speed indicator
      const speedColors = {
        slow: '#f56565',
        medium: '#ed8936',
        fast: '#48bb78'
      };
      
      ctx.fillStyle = speedColors[corner.speed as keyof typeof speedColors] || '#718096';
      ctx.beginPath();
      ctx.arc(x + 15, y - 15, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const renderFacilities = (ctx: CanvasRenderingContext2D, track: any) => {
    if (!track.facilities) return;

    const facilityColors = {
      grandstand: '#805ad5',
      pit: '#e53e3e',
      paddock: '#38a169',
      media: '#3182ce',
      safety: '#d69e2e'
    };

    track.facilities.forEach((facility: any) => {
      const x = facility.x * 4;
      const y = facility.y * 4;
      
      ctx.fillStyle = facilityColors[facility.type as keyof typeof facilityColors] || '#718096';
      
      // Different shapes for different facilities
      switch (facility.type) {
        case 'grandstand':
          ctx.fillRect(x - 8, y - 4, 16, 8);
          break;
        case 'pit':
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          break;
        default:
          ctx.fillRect(x - 4, y - 4, 8, 8);
      }
      
      // Facility label
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(facility.type.toUpperCase(), x, y + 20);
    });
  };

  const renderLighting = (ctx: CanvasRenderingContext2D, track: any) => {
    // Add ambient lighting effects
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(-400, -400, 800, 800);
    
    // Track lighting
    if (track.corners_data) {
      track.corners_data.forEach((corner: any, index: number) => {
        if (index % 3 === 0) { // Every third corner has lighting
          const x = corner.x * 4;
          const y = corner.y * 4;
          
          const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
          lightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = lightGradient;
          ctx.beginPath();
          ctx.arc(x, y, 30, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: '600px' }}
      />
      
      {/* Render Stats */}
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
        <div>FPS: {renderStats.fps}</div>
        <div>Mode: {viewMode}</div>
        <div>Zoom: {Math.round(zoom * 100)}%</div>
      </div>
      
      {/* Performance Indicator */}
      <div className="absolute bottom-4 right-4">
        <motion.div
          animate={{ 
            scale: renderStats.fps > 30 ? 1 : [1, 1.2, 1],
            backgroundColor: renderStats.fps > 30 ? '#48bb78' : '#f56565'
          }}
          transition={{ duration: 0.5 }}
          className="w-3 h-3 rounded-full"
        />
      </div>
    </div>
  );
};

export default Track3DRenderer;