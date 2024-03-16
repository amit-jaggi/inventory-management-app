import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tooltip,
	IconButton,
	Typography,
	Button,
	Box,
	TextField,
	InputAdornment,
} from '@mui/material';
import {
	HighlightOff,
	CategoryRounded,
	AttachMoneyRounded,
	ShoppingBagRounded,
	LocalOfferRounded,
	InfoOutlined,
} from '@mui/icons-material';
import { FONTS } from '../utils/styles';
import { useDispatch } from 'react-redux';
import { editProduct } from '../redux/actions/actions';


const inititalInput = {
	category: "",
	price: "",
	quantity: "",
	value: "",
};

const EditDialog = ({ open, handleClose, data }) => {

	const dispatch = useDispatch();

	const [input, setInput] = useState(inititalInput);

	const { category, price, quantity, value } = input;

	useEffect(() => {
		if (data && open) {
			setInput({
				category: data.category,
				price: data.price,
				quantity: data.quantity,
				value: data.price * data.quantity,
			});
		};
		if (!open) {
			setInput(inititalInput);
		}
	}, [data, open]);

	function handleChange(key, value) {
		setInput(prevInput => ({ ...prevInput, [key]: value }));
	}

	const handleProductUpdate = () => {
		const updatedData = {
			id: data?.id,
			category: input.category,
			isDisable: data?.isDisable,
			name: data?.name,
			price: Number(input.price),
			quantity: Number(input.quantity),
			value: Number(input.value),
		};
		dispatch(editProduct(updatedData));
		handleClose();
	}

	function isDisabled() {
		return [
			category,
			price,
			quantity,
			value,
			Number(value) === Number(price) * Number(quantity)
				? 'good to go'
				: ''
		].includes('');
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					maxWidth: 550,
					width: 1,
					"& .MuiInputBase-root": {
						fontSize: 14,
						borderRadius: 1,
						p: "3.5px 5px",
					},
				},
			}}
		>
			<DialogTitle
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography
					sx={{
						...FONTS.medium,
						fontSize: '24px',
						cursor: 'default',
					}}
				>Edit {data !== null ? data?.name : ''}</Typography>
				<Tooltip title="Close">
					<IconButton
						children={<HighlightOff />}
						onClick={handleClose}
					/>
				</Tooltip>
			</DialogTitle>

			<DialogContent>
				<Box
					sx={{
						my: "auto",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 3,
						alignItems: "center",
						px: 3,
						mx: "auto",
					}}
				>
					<Box>
						<Typography
							sx={{
								...FONTS.medium,
								fontSize: '18px',
								mb: 1,
								cursor: 'default',
							}}
						>Category</Typography>
						<TextField
							size="small"
							placeholder="Category"
							InputProps={{
								style: {
									...FONTS.medium,
									fontSize: '14px',
								},
								startAdornment: (
									<InputAdornment position="start">
										<CategoryRounded sx={{ fontSize: '22px', ml: '4px' }} />
									</InputAdornment>
								),
							}}
							value={category}
							onChange={(e) => {
								if (/^[A-Za-z\s]*$/.test(e.target.value)) {
									handleChange("category", e.target.value);
								}
							}}
							error={category === ''}
							autoComplete='off'
						/>
					</Box>
					<Box>
						<Typography
							sx={{
								...FONTS.medium,
								fontSize: '18px',
								mb: 1,
								cursor: 'default',
							}}
						>Price</Typography>
						<TextField
							size="small"
							placeholder="Price"
							InputProps={{
								style: {
									...FONTS.medium,
									fontSize: '14px',
								},
								startAdornment: (
									<InputAdornment position="start">
										<AttachMoneyRounded sx={{ fontSize: '22px', ml: '4px' }} />
									</InputAdornment>
								),
							}}
							value={price}
							onChange={(e) => {
								if (/^[0-9]{0,4}$/.test(e.target.value)) {
									handleChange("price", e.target.value);
								}
							}}
							error={price === ''}
							autoComplete='off'
						/>
					</Box>
					<Box>
						<Typography
							sx={{
								...FONTS.medium,
								fontSize: '18px',
								mb: 1,
								cursor: 'default',
							}}
						>Quantity</Typography>
						<TextField
							size="small"
							placeholder="Quantity"
							InputProps={{
								style: {
									...FONTS.medium,
									fontSize: '14px',
								},
								startAdornment: (
									<InputAdornment position="start">
										<ShoppingBagRounded sx={{ fontSize: '22px', ml: '4px' }} />
									</InputAdornment>
								),
							}}
							value={quantity}
							onChange={(e) => {
								if (/^[0-9]{0,4}$/.test(e.target.value)) {
									handleChange("quantity", e.target.value);
								}
							}}
							error={quantity === ''}
							autoComplete='off'
						/>
					</Box>
					<Box>
						<Typography
							sx={{
								...FONTS.medium,
								fontSize: '18px',
								mb: 1,
								cursor: 'default',
								display: 'flex',
								alignItems: 'center',
							}}
						>Value&nbsp;{
								Number(value) !== Number(price) * Number(quantity)
									? (<Tooltip title={`Incorrect Value provided based on the price & quantity. Expected Result: ${Number(price) * Number(quantity)}`}>
										<InfoOutlined fontSize="small" sx={{ color: 'red', fontSize: '12px', cursor: 'pointer' }} />
									</Tooltip>)
									: ('')
							}</Typography>
						<TextField
							size="small"
							placeholder="Value"
							InputProps={{
								style: {
									...FONTS.medium,
									fontSize: '14px',
								},
								startAdornment: (
									<InputAdornment position="start">
										<LocalOfferRounded sx={{ fontSize: '22px', ml: '4px' }} />
									</InputAdornment>
								),
							}}
							value={value}
							onChange={(e) => {
								if (/^[0-9]{0,4}$/.test(e.target.value)) {
									handleChange("value", e.target.value);
								}
							}}
							error={value === '' || Number(value) !== Number(price) * Number(quantity)}
							autoComplete='off'
						/>
					</Box>
				</Box>
			</DialogContent>

			<DialogActions sx={{
				pb: 2,
				pr: 7,
			}}>
				<Button variant="text" sx={{ mr: '10px', textTransform: 'none', }} onClick={handleClose}>
					Cancel
				</Button>
				<Button
					variant="contained"
					sx={{
						textTransform: 'none',
					}}

					disabled={isDisabled()}
					onClick={() => handleProductUpdate()}
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditDialog