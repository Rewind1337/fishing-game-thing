export default function resourceHook(_context) {
    return {
      fish: _context.save.resources.fish || 0,
      fishes: _context.save.resources.fishes || [0, 0],
      worms: _context.save.resources.worms || 0,
      artifacts: _context.save.resources.artifacts || 0,
    };
}