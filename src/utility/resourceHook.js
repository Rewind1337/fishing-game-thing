export default function resourceHook(_context) {
  const resources = {
    fish: _context.save.resources.fish || 0,
    worms: _context.save.resources.worms || 0,
    artifacts: _context.save.resources.artifacts || 0,
  };

  return resources;
}