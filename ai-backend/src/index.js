import 'dotenv/config';
import { createApp } from './app.js';

const port = Number.parseInt(process.env.PORT || '4100', 10);

createApp().listen(port, () => {
  console.log(`Test-case agent listening on http://localhost:${port}`);
});
