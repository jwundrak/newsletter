"use strict";

Ext.ns('Ext.ux.TYPO3.Newsletter.Store');

/**
 * A Store for the selectedNewsletter model using ExtDirect to communicate with the
 * server side extbase framework.
 */
Ext.ux.TYPO3.Newsletter.Store.SelectedNewsletter = function() {

    var selectedNewsletterStore = null;

    var initialize = function() {
        if (selectedNewsletterStore == null) {
            var newsletterStore = Ext.StoreMgr.get('Tx_Newsletter_Domain_Model_Newsletter');
            selectedNewsletterStore = new Ext.data.DirectStore({
                storeId: 'Tx_Newsletter_Domain_Model_SelectedNewsletter',
                // Here we use the same JsonReader as NewsletterStore to
                // get the exact same definition of fields as both store have same RecordType
                reader: newsletterStore.reader,
                api: {
                    read: Ext.ux.TYPO3.Newsletter.Remote.NewsletterController.statisticsAction
                },
                paramOrder: {
                    read: ['data']
                },
                restful: false,
                batch: false,
                remoteSort: false
            });
        }
    }

    /**
     * Public API of this singleton.
     */
    return {
        initialize: initialize
    }
}();
