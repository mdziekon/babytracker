// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import hooksPlugin from "eslint-plugin-react-hooks";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        plugins: {
          "react-hooks": hooksPlugin,
        },
        rules: hooksPlugin.configs.recommended.rules,
      },
);
