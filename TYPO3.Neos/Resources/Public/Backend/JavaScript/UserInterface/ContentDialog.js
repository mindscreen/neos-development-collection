Ext.ns("F3.TYPO3.UserInterface");

F3.TYPO3.UserInterface.ContentDialog = Ext.extend(Ext.Container, {
	showCancelButton: true,
	showOkButton: true,
	dialogPosition: 'right',
	moduleDialog: null,
	initComponent: function() {
		var config,
			toolbarConfig;
		toolbarConfig = {
			xtype: 'toolbar',
			items: []
		};
		if (this.showCancelButton) {
			toolbarConfig.items.push({
				itemId: 'cancelButton',
				text: 'Cancel',
				scale: 'large',
				handler: this._handleButtonClick,
				scope: this
			});
		}
		if (this.showOkButton) {
			if (toolbarConfig.items.length > 0) {
				toolbarConfig.items.push({xtype: 'tbspacer', width: 20});
			}
			toolbarConfig.items.push({
				itemId: 'okButton',
				text: 'OK',
				width: '40',
				scale: 'large',
				handler: this._handleButtonClick,
				scope: this
			});
		}
		config = {
			height: 13,
			cls: 'F3-TYPO3-UserInterface-ContentDialog',
			style: 'position: relative; z-index: 500; overflow: show',
			items: {
				xtype: 'panel',
				cls: 'F3-TYPO3-UserInterface-ContentDialog-Panel',
				style: 'position: absolute; top: 13px; right: 100px',
				border: false,
				tbar: toolbarConfig,
				ref: 'panel'
			}
		};
		Ext.apply(this, config);
		F3.TYPO3.UserInterface.ContentDialog.superclass.initComponent.call(this);

		this.panel.enableBubble([
			'F3.TYPO3.UserInterface.ContentDialog.buttonClick',
			'F3.TYPO3.UserInterface.ContentDialog.cancelled'
		]);

		this.panel.getBubbleTarget = function() {
			return this.ownerCt.moduleDialog;
		};			
	},

	_handleButtonClick: function(button, event) {
		this.panel.fireEvent('F3.TYPO3.UserInterface.ContentDialog.buttonClick', button);
		if (button.itemId === 'cancelButton') {
			this.panel.fireEvent('F3.TYPO3.UserInterface.ContentDialog.cancelled');
		}
		// TODO: How to handle validation errors?
	}
	
});
Ext.reg('F3.TYPO3.UserInterface.ContentDialog', F3.TYPO3.UserInterface.ContentDialog);
