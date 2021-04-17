import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
  test('Status in props should be in the state', () => {
    const component = create(<ProfileStatus status="status" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('status');
  });

  test('After creation span should be displayed', () => {
    const component = create(<ProfileStatus status="status" />);
    const instance = component.root;
    const span = instance.findByType('span');
    expect(span).not.toBeNull();
  });

  test('After creation span should contain correct status', () => {
    const component = create(<ProfileStatus status="status" />);
    const instance = component.root;
    const span = instance.findByType('span');
    expect(span.props.children).toBe('status');
  });

  test('After creation input should not be displayed', () => {
    const component = create(<ProfileStatus status="status" />);
    const instance = component.root;

    expect(() => {
      const input = instance.findByType('input');
    }).toThrow();
  });

  test('Input should be displayed in editMode instead span', () => {
    const component = create(<ProfileStatus status="status" />);
    const instance = component.root;
    const span = instance.findByType('span');
    span.props.onDoubleClick();
    const input = instance.findByType('input');
    expect(input.props.value).toBe('status');
  });

  test('Callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="status" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
