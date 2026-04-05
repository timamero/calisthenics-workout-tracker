const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

module.exports = config;

// const { getDefaultConfig } = require('expo/metro-config');
// const path = require('path');

// // Find the project and workspace directories
// const projectRoot = __dirname;
// // This can be replaced with `find-yarn-workspace-root`
// const monorepoRoot = path.resolve(projectRoot, '../../..');

// const config = getDefaultConfig(projectRoot);

// // Only list the packages within your monorepo that your app uses. No need to add anything else.
// const monorepoPackages = {
//   '@cwt/state': path.resolve(monorepoRoot, 'packages/state'),
//   '@cwt/schema': path.resolve(monorepoRoot, 'packages/schema'),
//   '@cwt/auth': path.resolve(monorepoRoot, 'packages/auth'),
//   '@cwt/api': path.resolve(monorepoRoot, 'packages/api'),
//   '@cwt/hooks': path.resolve(monorepoRoot, 'packages/hooks'),
//   '@cwt/mocks': path.resolve(monorepoRoot, 'packages/mocks'),
//   '@cwt/utils': path.resolve(monorepoRoot, 'packages/utils'),
//   '@cwt/content': path.resolve(monorepoRoot, 'packages/content'),
//   '@cwt/context': path.resolve(monorepoRoot, 'packages/context'),
// };

// // 1. Watch the local app directory, and only the shared packages (limiting the scope and speeding it up)
// // Note how we change this from `monorepoRoot` to `projectRoot`. This is part of the optimization!
// config.watchFolders = [projectRoot, ...Object.values(monorepoPackages)];

// // Add the monorepo workspaces as `extraNodeModules` to Metro.
// // If your monorepo tooling creates workspace symlinks in the `node_modules` directory,
// // you can either add symlink support to Metro or set the `extraNodeModules` to avoid the symlinks.
// // See: https://metrobundler.dev/docs/configuration/#extranodemodules
// config.resolver.extraNodeModules = monorepoPackages;

// // 2. Let Metro know where to resolve packages and in what order
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(monorepoRoot, 'node_modules'),
// ];

// module.exports = config;
