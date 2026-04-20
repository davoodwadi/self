import { Node, Edge } from '@xyflow/react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  ShoppingCart,
  Search,
  Handshake,
  Award
} from 'lucide-react';
import React from 'react';

// Color semantics:
// Charcoal for neutral concepts, Crimson for B2B/core focus, Gold for premium value
const colors = {
  charcoal: '#2D2D32',
  crimson: '#8B0000',
  gold: '#D4AF37'
};

// 1. Market Structure and Demand (Split Lane)
// Compares B2C vs B2B characteristics
export const marketStructureFlow = {
  aiGeneratedNodes: [
    // B2C Lane (Left)
    {
      id: 'b2c-header',
      position: { x: 0, y: 0 },
      data: { label: 'B2C Market', icon: <Users size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'b2c-buyers',
      position: { x: 0, y: 160 },
      data: { label: 'Many Small Buyers', icon: <Users size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'b2c-demand',
      position: { x: 0, y: 320 },
      data: { label: 'Primary Demand', icon: <ShoppingCart size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    // B2B Lane (Right)
    {
      id: 'b2b-header',
      position: { x: 400, y: 0 },
      data: { label: 'B2B Market', icon: <Building2 size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'b2b-buyers',
      position: { x: 400, y: 160 },
      data: { label: 'Few Large Buyers', icon: <Building2 size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'b2b-demand',
      position: { x: 400, y: 320 },
      data: { label: 'Derived Demand', sublabel: 'Inelastic & Volatile', icon: <TrendingUp size={20} strokeWidth={2} />, color: colors.crimson }
    }
  ] as Node[],
  aiGeneratedEdges: [
    { id: 'e-c1', source: 'b2c-header', target: 'b2c-buyers', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top' },
    { id: 'e-c2', source: 'b2c-buyers', target: 'b2c-demand', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top' },
    { id: 'e-b1', source: 'b2b-header', target: 'b2b-buyers', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top', style: { stroke: colors.crimson } },
    { id: 'e-b2', source: 'b2b-buyers', target: 'b2b-demand', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top', style: { stroke: colors.crimson } }
  ] as Edge[]
};

// 2. Roles in the Buying Center (Radiating / Hub)
// Shows the primary roles within a buying center
export const buyingCenterFlow = {
  aiGeneratedNodes: [
    {
      id: 'center',
      position: { x: 320, y: 0 },
      data: { label: 'Buying Center', icon: <Building2 size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'users',
      position: { x: 0, y: 160 },
      data: { label: 'Users', sublabel: 'Actual consumers', icon: <Users size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'influencers',
      position: { x: 320, y: 160 },
      data: { label: 'Influencers', sublabel: 'Provide specs', icon: <TrendingUp size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'buyers',
      position: { x: 640, y: 160 },
      data: { label: 'Buyers', sublabel: 'Formal authority', icon: <ShoppingCart size={20} strokeWidth={2} />, color: colors.charcoal }
    }
  ] as Node[],
  aiGeneratedEdges: [
    { id: 'e1', source: 'center', target: 'users', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top', style: { stroke: colors.crimson } },
    { id: 'e2', source: 'center', target: 'influencers', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top', style: { stroke: colors.crimson } },
    { id: 'e3', source: 'center', target: 'buyers', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top', style: { stroke: colors.crimson } }
  ] as Edge[]
};

// 3. Key Account Management (Cascading Process)
// Sequence for key account management
export const kamProcessFlow = {
  aiGeneratedNodes: [
    {
      id: 'identify',
      position: { x: 0, y: 0 },
      data: { label: 'Identify Accounts', sublabel: 'Find most valuable', icon: <Search size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'build',
      position: { x: 320, y: 160 },
      data: { label: 'Build Relationships', sublabel: 'Dedicated teams', icon: <Handshake size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'customize',
      position: { x: 640, y: 320 },
      data: { label: 'Deliver Solutions', sublabel: 'Customized service', icon: <Award size={20} strokeWidth={2} />, color: colors.gold }
    }
  ] as Node[],
  aiGeneratedEdges: [
    { id: 'k1', source: 'identify', target: 'build', type: 'smoothstep', animated: true, sourceHandle: 'right-source', targetHandle: 'top' },
    { id: 'k2', source: 'build', target: 'customize', type: 'smoothstep', animated: true, sourceHandle: 'right-source', targetHandle: 'top', style: { stroke: colors.crimson } }
  ] as Edge[]
};
