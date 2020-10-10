/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { getTemplateInfo } from '../../utils';

export default function TemplateDetails( { template, onClose } ) {
	const { openNavigationPanelToMenu } = useDispatch( 'core/edit-site' );
	if ( ! template ) {
		return null;
	}

	const { title, description } = getTemplateInfo( template );

	const showTemplateInSidebar = () => {
		onClose();
		openNavigationPanelToMenu( 'templates' );
	};

	return (
		<div className="edit-site-template-details">
			<p className="edit-site-template-details__heading">
				{ __( 'Template details' ) }
			</p>
			<Button onClick={ showTemplateInSidebar } isTertiary>
				{ __( 'View in navigation.' ) }
			</Button>
			{ title && (
				<p>
					{ sprintf(
						/* translators: %s: Name of the template. */
						__( 'Name: %s' ),
						title
					) }
				</p>
			) }
			{ description && (
				<p>
					{ sprintf(
						/* translators: %s: Description of the template. */
						__( 'Description: %s' ),
						description
					) }
				</p>
			) }
		</div>
	);
}
