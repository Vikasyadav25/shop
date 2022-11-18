import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Box } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ordered, setOrdered] = React.useState(false)
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box
                id="basic-menu"
                anchorEl={anchorEl}
                open={true}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ padding: '10px', border: '1px solid #f5f5f5', borderRadius: '20px' }}
            >
                <h3>Cart Totals</h3>
                <div>
                    <span className='subtotal d-flex'><h5>Subtotal</h5><p style={{ color: 'BLUE' }}>$101</p></span>
                </div>
                <div>
                    <span className='subtotal d-flex total'><h5>Total</h5 ><p style={{ color: 'BLUE' }}>$101</p></span>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
                    <Button sx={{ borderRadius: '20px' }} variant='contained' onClick={() => setOrdered(!ordered)}>Proceed to checkout</Button>
                </div>
            </Box>
            {
                ordered ?
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, textAlign: 'center', background: '#000', color: "#fff", zIndex: "33333333333333", fontSize: '50px' }} onClick={() => setOrdered(!ordered)}>
                        Thankyou
                    </div>
                    :
                    null
            }


        </div>
    );
}