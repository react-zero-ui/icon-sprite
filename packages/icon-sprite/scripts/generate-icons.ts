#!/usr/bin/env node
import { generateIconComponents } from "../icon-library/component-generation.ts"

const { icons, sourceSvgs } = generateIconComponents()
console.log(`Generated ${icons} icons from ${sourceSvgs} package-owned SVGs.`)
