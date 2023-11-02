export default function resourceHook(_context) {
    return {
      wormPower: _context.save.aspects.wormPower || 0,
      fishPower: _context.save.aspects.fishPower || 0,
      tearPower: _context.save.aspects.tearPower || 0,
      fiercePower: _context.save.aspects.fiercePower || 0,
      earthPower: _context.save.aspects.earthPower || 0,
    };
}