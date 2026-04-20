import { Node, Edge } from '@xyflow/react';
import { 
  Database, 
  FileText, 
  Globe, 
  Store,
  Users,
  MessageSquare,
  TrendingUp,
  Heart
} from 'lucide-react';
import React from 'react';

// Color semantics:
// Charcoal for neutral concepts, Crimson for core focus/internal, Gold for premium value
const colors = {
  charcoal: '#2D2D32',
  crimson: '#8B0000',
  gold: '#D4AF37'
};

// 1. Internal vs External Secondary Data (Split Lane)
export const internalExternalDataFlow = {
  aiGeneratedNodes: [
    // Internal Lane (Left)
    {
      id: 'internal-header',
      position: { x: 0, y: 0 },
      data: { label: 'Internal Data', icon: <Store size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'internal-sales',
      position: { x: 0, y: 160 },
      data: { label: 'Sales & Financials', sublabel: 'Transaction records', icon: <TrendingUp size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'internal-crm',
      position: { x: 0, y: 320 },
      data: { label: 'Customer Databases', sublabel: 'CRM & interactions', icon: <Database size={20} strokeWidth={2} />, color: colors.crimson }
    },
    // External Lane (Right)
    {
      id: 'external-header',
      position: { x: 400, y: 0 },
      data: { label: 'External Data', icon: <Globe size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'external-gov',
      position: { x: 400, y: 160 },
      data: { label: 'Government Data', sublabel: 'Census & statistics', icon: <FileText size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'external-commercial',
      position: { x: 400, y: 320 },
      data: { label: 'Commercial Services', sublabel: 'Market research firms', icon: <Users size={20} strokeWidth={2} />, color: colors.charcoal }
    }
  ] as Node[],
  aiGeneratedEdges: [
    { id: 'e-in1', source: 'internal-header', target: 'internal-sales', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top', style: { stroke: colors.crimson } },
    { id: 'e-in2', source: 'internal-sales', target: 'internal-crm', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top', style: { stroke: colors.crimson } },
    { id: 'e-ex1', source: 'external-header', target: 'external-gov', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top' },
    { id: 'e-ex2', source: 'external-gov', target: 'external-commercial', type: 'smoothstep', animated: true, sourceHandle: 'bottom-source', targetHandle: 'top' }
  ] as Edge[]
};

// 2. The CRM Cycle (Core Process)
export const crmCycleFlow = {
  aiGeneratedNodes: [
    {
      id: 'data-collection',
      position: { x: 0, y: 0 },
      data: { label: 'Data Collection', sublabel: 'Gather touchpoints', icon: <Database size={20} strokeWidth={2} />, color: colors.charcoal }
    },
    {
      id: 'analysis',
      position: { x: 320, y: 160 },
      data: { label: 'Data Analysis', sublabel: 'Find meaningful patterns', icon: <TrendingUp size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'interaction',
      position: { x: 640, y: 320 },
      data: { label: 'Personalization', sublabel: 'Tailored interactions', icon: <MessageSquare size={20} strokeWidth={2} />, color: colors.crimson }
    },
    {
      id: 'loyalty',
      position: { x: 960, y: 480 },
      data: { label: 'Customer Loyalty', sublabel: 'Maximize lifetime value', icon: <Heart size={20} strokeWidth={2} />, color: colors.gold }
    }
  ] as Node[],
  aiGeneratedEdges: [
    { id: 'c1', source: 'data-collection', target: 'analysis', type: 'smoothstep', animated: true, sourceHandle: 'right-source', targetHandle: 'top' },
    { id: 'c2', source: 'analysis', target: 'interaction', type: 'smoothstep', animated: true, sourceHandle: 'right-source', targetHandle: 'top', style: { stroke: colors.crimson } },
    { id: 'c3', source: 'interaction', target: 'loyalty', type: 'smoothstep', animated: true, sourceHandle: 'right-source', targetHandle: 'top', style: { stroke: colors.gold } }
  ] as Edge[]
};
