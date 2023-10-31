export default function resourceHook(_context) {

    return {
      bait: _context.save.resources.bait || [],
      fishes: _context.save.resources.fishes || [],
      artifacts: _context.save.resources.artifacts || 0,
    };
}