import { RadonisConfig } from '@ioc:Microeinhundert/Radonis'
import Application from '@ioc:Adonis/Core/Application'
import { twindPlugin } from '@microeinhundert/radonis-twind'

const radonisConfig: RadonisConfig = {
  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | The registered server plugins. Client plugins are registered
  | separately inside the client entry file.
  |
  */
  plugins: [twindPlugin()],

  /*
  |--------------------------------------------------------------------------
  | Head
  |--------------------------------------------------------------------------
  |
  | Configuration of the page <head>.
  |
  */
  head: {
    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    |
    | Defaults and general configuration of the page <title>.
    |
    */
    title: {
      /*
      |--------------------------------------------------------------------------
      | Default
      |--------------------------------------------------------------------------
      |
      | The default title value.
      | Views without a title set will fall back to this value.
      |
      */
      default: Application.appName,

      /*
      |--------------------------------------------------------------------------
      | Prefix
      |--------------------------------------------------------------------------
      |
      | A string to prefix the title with.
      |
      */
      prefix: '',

      /*
      |--------------------------------------------------------------------------
      | Suffix
      |--------------------------------------------------------------------------
      |
      | A string to suffix the title with.
      |
      */
      suffix: '',

      /*
      |--------------------------------------------------------------------------
      | Separator
      |--------------------------------------------------------------------------
      |
      | The character separating the title and the prefix / suffix.
      |
      */
      separator: '|',
    },

    /*
    |--------------------------------------------------------------------------
    | Default meta
    |--------------------------------------------------------------------------
    |
    | The default <meta> tags.
    |
    */
    defaultMeta: {
      charSet: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },

  client: {
    /*
    |--------------------------------------------------------------------------
    | Entry file
    |--------------------------------------------------------------------------
    |
    | The entry file is where the client library is initialized.
    | You can also use this file to include your own scripts
    | that are not bound to a specific component "Island".
    |
    */
    entryFile: Application.resourcesPath('entry.client.ts'),

    /*
    |--------------------------------------------------------------------------
    | Always include entry file
    |--------------------------------------------------------------------------
    |
    | Always include the entry file, even if no client-side
    | hydrated components are on the page.
    |
    */
    alwaysIncludeEntryFile: false,

    /*
    |--------------------------------------------------------------------------
    | Components dir
    |--------------------------------------------------------------------------
    |
    | The directory where all your React components are located in.
    | These components will be built for the client
    | and are therefore hydratable.
    |
    */
    componentsDir: Application.resourcesPath('components'),

    /*
    |--------------------------------------------------------------------------
    | Output dir
    |--------------------------------------------------------------------------
    |
    | The directory where the client bundle will be written to.
    | If you change this to some directory outside the public directory,
    | make sure to set up the webserver accordingly in order for the client
    | assets to be publicly accessible.
    |
    | Make sure to also update the output-dir flag of
    | the `build:client` script inside package.json accordingly.
    |
    */
    outputDir: Application.publicPath('radonis'),

    /*
    |--------------------------------------------------------------------------
    | Limit manifest
    |--------------------------------------------------------------------------
    |
    | Limit the client manifest to only include data required for client-side
    | hydration. Disable this if you have some use case that requires
    | all data to be available at all times.
    |
    */
    limitManifest: true,

    /*
    |--------------------------------------------------------------------------
    | Build options
    |--------------------------------------------------------------------------
    |
    | Allows overriding the build options used
    | by esbuild for bundling the client.
    |
    | Use with caution: This is only an escape hatch.
    | Overriding the options can break the build.
    |
    */
    buildOptions: {},
  },
}

export default radonisConfig
