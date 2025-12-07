// Basic Node.js version gate for environments where npm ignores "engines" warnings.
function parseVersion(version) {
  var parts = String(version || '0.0.0').split('.');
  return {
    major: parseInt(parts[0], 10) || 0,
    minor: parseInt(parts[1], 10) || 0,
    patch: parseInt(parts[2], 10) || 0,
  };
}

function isAtLeast(current, required) {
  if (current.major !== required.major) return current.major > required.major;
  if (current.minor !== required.minor) return current.minor > required.minor;
  return current.patch >= required.patch;
}

var required = parseVersion('18.0.0');
var current = parseVersion(process.versions && process.versions.node);

if (!isAtLeast(current, required)) {
  console.error('\nEste projeto requer Node.js >= 18.0.0.');
  console.error('Node detectado: ' + (process.versions && process.versions.node));
  console.error('Atualize o Node (ex.: `nvm install` ou Node 20 LTS) e reinstale as dependencias.\n');
  process.exit(1);
}
