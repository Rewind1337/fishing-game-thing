export default function resourceHook(_context) {
    return {
      wormPower: _context.save.aspects.wormPower || 0,
    };
}