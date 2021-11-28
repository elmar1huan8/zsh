'use babel';

import ZshTerminalView from './zsh-terminal-view';
import { CompositeDisposable } from 'atom';

export default {

  zshTerminalView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.zshTerminalView = new ZshTerminalView(state.zshTerminalViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.zshTerminalView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zsh-terminal:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.zshTerminalView.destroy();
  },

  serialize() {
    return {
      zshTerminalViewState: this.zshTerminalView.serialize()
    };
  },

  toggle() {
    console.log('ZshTerminal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
