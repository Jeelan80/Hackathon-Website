import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../test/utils/test-utils';
import Modal from '../Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset body overflow
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should render modal when open', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render modal when closed', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    // Click on backdrop (the div with backdrop-blur-sm class)
    const backdrop = document.querySelector('.bg-black\\/60');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('should call onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should prevent body scroll when open', () => {
    render(<Modal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore body scroll when closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<Modal {...defaultProps} isOpen={false} />);
    
    expect(document.body.style.overflow).toBe('unset');
  });

  it('should apply correct size classes', () => {
    const { rerender } = render(<Modal {...defaultProps} size="sm" />);
    
    let modalContent = document.querySelector('.max-w-md');
    expect(modalContent).toBeInTheDocument();

    rerender(<Modal {...defaultProps} size="md" />);
    modalContent = document.querySelector('.max-w-lg');
    expect(modalContent).toBeInTheDocument();

    rerender(<Modal {...defaultProps} size="lg" />);
    modalContent = document.querySelector('.max-w-2xl');
    expect(modalContent).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-content');
  });

  it('should focus first focusable element when opened', async () => {
    render(
      <Modal {...defaultProps}>
        <button>First Button</button>
        <button>Second Button</button>
      </Modal>
    );
    
    await waitFor(() => {
      const firstButton = screen.getByText('First Button');
      expect(firstButton).toHaveFocus();
    });
  });

  it('should trap focus within modal', async () => {
    render(
      <Modal {...defaultProps}>
        <button>First Button</button>
        <button>Second Button</button>
      </Modal>
    );
    
    const firstButton = screen.getByText('First Button');
    const secondButton = screen.getByText('Second Button');
    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    
    // Focus should start on first button
    await waitFor(() => {
      expect(firstButton).toHaveFocus();
    });
    
    // Tab should move to second button
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
    expect(secondButton).toHaveFocus();
    
    // Tab should move to close button
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
    expect(closeButton).toHaveFocus();
    
    // Tab should wrap back to first button
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
    expect(firstButton).toHaveFocus();
    
    // Shift+Tab should go backwards
    fireEvent.keyDown(document.activeElement!, { key: 'Tab', shiftKey: true });
    expect(closeButton).toHaveFocus();
  });

  it('should restore focus when closed', async () => {
    // Create a button outside the modal to focus initially
    document.body.innerHTML = '<button id="outside-button">Outside Button</button>';
    const outsideButton = document.getElementById('outside-button')!;
    outsideButton.focus();
    
    const { rerender } = render(<Modal {...defaultProps} />);
    
    // Modal should be open and focus should be trapped
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Close the modal
    rerender(<Modal {...defaultProps} isOpen={false} />);
    
    // Focus should be restored to the outside button
    await waitFor(() => {
      expect(outsideButton).toHaveFocus();
    });
  });

  it('should handle missing focusable elements gracefully', () => {
    render(
      <Modal {...defaultProps}>
        <div>No focusable elements</div>
      </Modal>
    );
    
    // Should not throw an error
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should close button have proper accessibility attributes', () => {
    render(<Modal {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    expect(closeButton).toHaveAttribute('type', 'button');
    expect(closeButton).toHaveClass('focus:outline-none', 'focus:ring-2');
  });
});