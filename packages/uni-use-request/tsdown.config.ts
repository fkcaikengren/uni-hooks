import { buildPackageManifest } from '../../scripts/utils.ts'
import { createTsDownConfig } from '../../tsdown.config.ts'

export default createTsDownConfig(buildPackageManifest('./package.json'))
