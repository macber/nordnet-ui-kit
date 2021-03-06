import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Pane from '../../../src/components/pane/pane';

describe('<Pane />', () => {
  let wrapper;
  const tabs = [{
    label: 'tab1label',
    body: 'tab1body',
  }, {
    label: 'tab2label',
    body: 'tab2body',
  }, {
    label: 'tab3label',
    body: 'tab3body',
  }];

  beforeEach(() => {
    wrapper = shallow(<Pane tabs={ tabs } />);
  });

  it('should render a <div />', () => {
    expect(wrapper.type()).to.equal('div');
  });

  it('should have class name pane', () => {
    expect(wrapper.hasClass('pane')).to.equal(true);
  });

  it('should only have one active tab', () => {
    expect(wrapper.find('li.pane__tab--is-active')).to.have.length(1);
  });

  it('should have number of tabs equal to input tabs', () => {
    expect(wrapper.find('li.pane__tab')).to.have.length(3);
  });

  it('should only have one visible tab body', () => {
    expect(wrapper.find('div.pane__body').children()
      .reduce((prev, div) => prev + (div.props().style.display === 'none' ? 0 : 1), 0))
      .to.equal(1);
  });

  it('should render labels in order according to input tab data', () => {
    expect(wrapper.find('ul.pane__tabs').children()
      .reduce((prev, li, index) => prev && li.childAt(0).text() === tabs[index].label, true))
      .to.equal(true);
  });

  it('should render bodies in order according to input tab data', () => {
    expect(wrapper.find('div.pane__body').children()
      .reduce((prev, div, index) => prev && div.childAt(0).text() === tabs[index].body, true))
      .to.equal(true);
  });

  describe('when tab #2 is clicked', () => {
    beforeEach(() => {
      wrapper.find('li.pane__tab').at(1).simulate('click');
    });

    it('should set class pane__tab--is-active on tab 2', () => {
      expect(wrapper.find('li.pane__tab').at(1).hasClass('pane__tab--is-active')).to.equal(true);
    });

    it('should set body #2 to visible', () => {
      expect(wrapper.find('div.pane__body').children().at(1).props().style.display).to.not.equal('none');
    });

    it('should only have one active tab', () => {
      expect(wrapper.find('li.pane__tab--is-active')).to.have.length(1);
    });

    it('should only have one visible tab body', () => {
      expect(wrapper.find('div.pane__body').children()
        .reduce((prev, div) => prev + (div.props().style.display === 'none' ? 0 : 1), 0))
        .to.equal(1);
    });
  });
});
