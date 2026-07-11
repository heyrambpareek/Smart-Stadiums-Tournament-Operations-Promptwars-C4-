// @ts-nocheck
import { Router } from 'express';
import { getLiveData } from '../services/simulationService';
import { generateAssistantResponse, generateOperationalSummary } from '../services/aiService';

const router = Router();

router.get('/data', (req: import('express').Request, res: import('express').Response) => {
  const data = getLiveData();
  res.json(data);
});

router.post('/ai/chat', async (req: import('express').Request, res: import('express').Response) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const reply = await generateAssistantResponse(message);
  res.json({ reply });
});

router.get('/ai/summary', async (req: import('express').Request, res: import('express').Response) => {
  const summary = await generateOperationalSummary();
  res.json({ summary });
});

export default router;
