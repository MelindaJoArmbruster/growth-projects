
import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/timers-context.tsx';

export default function Header() {
  const timersCtx = useTimersContext();
  const handleClick = () => {timersCtx.isRunning ? timersCtx.stopTimers() : timersCtx.startTimers();};
  
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={handleClick}>{timersCtx.isRunning ? 'Stop' : 'Start'} Timers</Button>
    </header>
  );
}
