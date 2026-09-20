// ESLint, flat config. Run with `npm run lint`.
//
// .mjs rather than .js on purpose: flat config is ESM, and package.json has no
// "type": "module", so a .js file here would be parsed as CommonJS and fail on
// the first import.
//
// Type-aware linting is enabled (projectService), which is what makes the rules
// below possible - no-floating-promises and no-misused-promises need the type
// checker, not just the syntax tree. It costs a slower lint for rules that
// catch real bugs rather than style.
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**', 'node_modules/**', '.angular/**', 'coverage/**'],
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
            ...angular.configs.tsRecommended,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        // Lets the template rules below see templates written inline in a
        // @Component, not only those in their own .html file.
        processor: angular.processInlineTemplates,
        rules: {
            // Consistency with the generated component, and it keeps app selectors
            // distinguishable from third-party ones in a template.
            '@angular-eslint/component-selector': [
                'error',
                { type: 'element', prefix: 'app', style: 'kebab-case' },
            ],
            '@angular-eslint/directive-selector': [
                'error',
                { type: 'attribute', prefix: 'app', style: 'camelCase' },
            ],

            // The two rules most worth having in an Angular app. An unawaited
            // promise loses its rejection: the request fails, nothing is logged,
            // and the UI just never updates. Both need type information.
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',

            // `any` disables every other check on the value it touches, which makes
            // the rest of this file decorative wherever it appears.
            '@typescript-eslint/no-explicit-any': 'error',

            // Underscore-prefixed arguments stay allowed: required positional
            // parameters you genuinely do not use are a real pattern in callbacks.
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            // Type-only imports erased at compile time rather than left as runtime
            // requires that pull in a module for nothing.
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { fixStyle: 'inline-type-imports' },
            ],

            // console.log is a debugging leftover; warn and error are legitimate.
            // Replace this with a logging service once there is one.
            'no-console': ['error', { allow: ['warn', 'error'] }],

            eqeqeq: ['error', 'always', { null: 'ignore' }],
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            // Accessibility in the linter rather than in review. These are the
            // mistakes that are cheap to fix while writing the template and
            // expensive to retrofit across a whole app.
            ...angular.configs.templateAccessibility,
        ],
        rules: {},
    },
    {
        // Tests get the same type-aware rules, minus the ones that fight the way
        // tests are written: assertions on partially-built objects, and promises
        // deliberately created and inspected rather than awaited.
        files: ['**/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/unbound-method': 'off',
        },
    },
);
