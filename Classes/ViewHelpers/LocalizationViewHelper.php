<?php

/**
 * Make localization files available in JavaScript
 *
 * @package Newsletter
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class Tx_Newsletter_ViewHelpers_LocalizationViewHelper extends Tx_Newsletter_ViewHelpers_AbstractViewHelper
{

    /**
     * Calls addJsFile on the Instance of t3lib_pagerenderer.
     *
     * @param string $name the list of file to include separated by coma
     * @param string $extKey the extension, where the file is located
     * @param string $pathInsideExt the path to the file relative to the ext-folder
     * @return void
     */
    public function render($name = 'locallang.xml', $extKey = NULL, $pathInsideExt = 'Resources/Private/Language/')
    {
        $names = explode(',', $name);

        if ($extKey == NULL) {
            $extKey = $this->controllerContext->getRequest()->getControllerExtensionKey();
        }
        $extPath = t3lib_extMgm::extPath($extKey);

        $localizations = array();
        foreach ($names as $name) {
            $filePath = $extPath . $pathInsideExt . $name;
            $localizations = array_merge($localizations, $this->getLocalizations($filePath));
        }

        $localizations = json_encode($localizations);
        $javascript = "Ext.ux.TYPO3.Newsletter.Language = $localizations;";

        $this->pageRenderer->addJsInlineCode($filePath, $javascript);
    }

    /**
     * Returns localization variables within an array
     *
     * @param $filePath
     * @return array
     * @throws Exception
     */
    protected function getLocalizations($filePath)
    {
        global $LANG;
        global $LOCAL_LANG;

        // Language inclusion
        $LANG->includeLLFile($filePath);
        if (!isset($LOCAL_LANG[$LANG->lang]) || empty($LOCAL_LANG[$LANG->lang]))
            $lang = 'default';
        else
            $lang = $LANG->lang;

        $result = array();
        foreach ($LOCAL_LANG[$lang] as $key => $value) {
            $target = $value[0]['target'];

            // Replace '.' in key because it would break JSON
            $key = str_replace('.', '_', $key);
            $result[$key] = $target;
        }

        return $result;
    }

}
