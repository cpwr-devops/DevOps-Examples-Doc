module.exports = {
    title: "Mainframe DevOps",
    //description: "Mainframe DevOps",
    themeConfig: {
        logo: '/compuware.png',
        //displayAllHeaders: true,
        nav: [
        { text: 'Home', link: '/'},
        { text: 'Pipelines', link: '/pipelines/'},
        { text: 'Configuration', link: '/tool_configuration/'},
        { text: 'APIs', link: '/code_examples/'}
        ],
        sidebar: {
            '/pipelines/': [
              '',   //getting started
              'pipelines',  //example pipelines
              'Mainframe_CI_Pipeline_from_Shared_Lib',  
              'Mainframe-CI-Example-pipeline',  
              'scenario/',  //ISPW scenario
              'scenario/TTT_scenario',
              'pipeline_parameters',
              'config_files',
              'helper_classes/',
              'Jenkins_Groovy'
            ],
            '/tool_configuration/': [
              'plugins', 
              '',      //configurations
              'webhook_setup',
              'CES_credentials_token',
              'Jenkins_config'
            ],
            '/code_examples/': [
                '',
                'Rest_api',
                'Topaz_cli',
                'Topaz_SDK',
                'Passticket',
                'Topaz_SDK_snippets'
            ]            
          }
    }
  }
