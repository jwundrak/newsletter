Ext.ns("TYPO3.Newsletter.Planer");

TYPO3.Newsletter.Planer.Bootstrap = Ext.apply(new TYPO3.Newsletter.Application.AbstractBootstrap, {
	initialize: function() {
//		this.addContentArea('management', 'F3-TYPO3-Management', {
//			html: 'Management'
//		});

		/**
		 * Handle a navigation token.
		 *
		 * @param {RegExp} regexp the callback is called if the regexp matches
		 * @param {function} callback Callback to be called
		 * @param scope
		 */
		this.handleNavigationToken(/planner/, function(e) {
			var component = TYPO3.Newsletter.UserInterface.mainContainer.formNewsletter || null;
			if (!component) {
				component = Ext.ComponentMgr.create({
					xtype: 'TYPO3.Newsletter.UserInterface.FormNewsletter',
					ref: 'formNewsletter'
				});

				TYPO3.Newsletter.UserInterface.mainContainer.add(component);
				TYPO3.Newsletter.UserInterface.mainContainer.doLayout();
			}

			Ext.iterate(TYPO3.Newsletter.UserInterface.mainContainer.items.items, function (element) {
				element.setVisible(false)
			});
			component.setVisible(true);
		});

		// TODO refactor to helper method
//		TYPO3.Newsletter.Application.on('TYPO3.Newsletter.UserInterface.SectionMenu.activated', function(itemId) {
//			if (itemId === 'management') {
//				Ext.History.add('management');
//				Ext.getCmp('F3-TYPO3-UserInterface-center').getLayout().setActiveItem('F3-TYPO3-Management');
//			}
//		});
	}
});

TYPO3.Newsletter.Application.registerBootstrap(TYPO3.Newsletter.Planer.Bootstrap);