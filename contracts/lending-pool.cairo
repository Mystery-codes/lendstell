// SPDX-License-Identifier: MIT
// Lendstell Lending Pool Contract

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256, uint256_add, uint256_sub, uint256_mul, uint256_div
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.starknet.common.syscalls import get_caller_address, get_contract_address
from starkware.cairo.common.math import assert_not_zero, assert_le

// Storage variables
@storage_var
func total_supply(asset: felt) -> (amount: Uint256) {
}

@storage_var
func total_borrowed(asset: felt) -> (amount: Uint256) {
}

@storage_var
func user_supply_balance(user: felt, asset: felt) -> (amount: Uint256) {
}

@storage_var
func user_borrow_balance(user: felt, asset: felt) -> (amount: Uint256) {
}

@storage_var
func asset_price(asset: felt) -> (price: Uint256) {
}

@storage_var
func interest_rate_model(asset: felt) -> (base_rate: Uint256, slope1: Uint256, slope2: Uint256) {
}

@storage_var
func liquidation_threshold(asset: felt) -> (threshold: Uint256) {
}

@storage_var
func reserve_factor(asset: felt) -> (factor: Uint256) {
}

// Events
@event
func Supply(user: felt, asset: felt, amount: Uint256) {
}

@event
func Withdraw(user: felt, asset: felt, amount: Uint256) {
}

@event
func Borrow(user: felt, asset: felt, amount: Uint256) {
}

@event
func Repay(user: felt, asset: felt, amount: Uint256) {
}

@event
func Liquidation(liquidator: felt, user: felt, collateral_asset: felt, debt_asset: felt, amount: Uint256) {
}

// Constructor
@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    return ();
}

// Supply function
@external
func supply{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt, amount: Uint256
) {
    let (caller) = get_caller_address();
    
    // Update user balance
    let (current_balance) = user_supply_balance.read(caller, asset);
    let (new_balance, _) = uint256_add(current_balance, amount);
    user_supply_balance.write(caller, asset, new_balance);
    
    // Update total supply
    let (current_total) = total_supply.read(asset);
    let (new_total, _) = uint256_add(current_total, amount);
    total_supply.write(asset, new_total);
    
    Supply.emit(caller, asset, amount);
    return ();
}

// Withdraw function
@external
func withdraw{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt, amount: Uint256
) {
    let (caller) = get_caller_address();
    
    // Check user has sufficient balance
    let (current_balance) = user_supply_balance.read(caller, asset);
    let (new_balance) = uint256_sub(current_balance, amount);
    
    // Check health factor after withdrawal
    let (health_factor) = calculate_health_factor(caller);
    assert_le(Uint256(1, 0), health_factor);
    
    // Update balances
    user_supply_balance.write(caller, asset, new_balance);
    let (current_total) = total_supply.read(asset);
    let (new_total) = uint256_sub(current_total, amount);
    total_supply.write(asset, new_total);
    
    Withdraw.emit(caller, asset, amount);
    return ();
}

// Borrow function
@external
func borrow{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt, amount: Uint256
) {
    let (caller) = get_caller_address();
    
    // Update user borrow balance
    let (current_balance) = user_borrow_balance.read(caller, asset);
    let (new_balance, _) = uint256_add(current_balance, amount);
    user_borrow_balance.write(caller, asset, new_balance);
    
    // Update total borrowed
    let (current_total) = total_borrowed.read(asset);
    let (new_total, _) = uint256_add(current_total, amount);
    total_borrowed.write(asset, new_total);
    
    // Check health factor after borrow
    let (health_factor) = calculate_health_factor(caller);
    assert_le(Uint256(1, 0), health_factor);
    
    Borrow.emit(caller, asset, amount);
    return ();
}

// Repay function
@external
func repay{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt, amount: Uint256
) {
    let (caller) = get_caller_address();
    
    // Update user borrow balance
    let (current_balance) = user_borrow_balance.read(caller, asset);
    let (new_balance) = uint256_sub(current_balance, amount);
    user_borrow_balance.write(caller, asset, new_balance);
    
    // Update total borrowed
    let (current_total) = total_borrowed.read(asset);
    let (new_total) = uint256_sub(current_total, amount);
    total_borrowed.write(asset, new_total);
    
    Repay.emit(caller, asset, amount);
    return ();
}

// Liquidation function
@external
func liquidate{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt, collateral_asset: felt, debt_asset: felt, amount: Uint256
) {
    let (caller) = get_caller_address();
    
    // Check if user can be liquidated
    let (health_factor) = calculate_health_factor(user);
    assert_le(health_factor, Uint256(1, 0));
    
    // Calculate liquidation bonus
    let (liquidation_bonus) = calculate_liquidation_bonus(collateral_asset, amount);
    
    // Transfer collateral to liquidator
    let (user_collateral) = user_supply_balance.read(user, collateral_asset);
    let (new_collateral) = uint256_sub(user_collateral, amount);
    user_supply_balance.write(user, collateral_asset, new_collateral);
    
    let (liquidator_collateral) = user_supply_balance.read(caller, collateral_asset);
    let (new_liquidator_collateral, _) = uint256_add(liquidator_collateral, liquidation_bonus);
    user_supply_balance.write(caller, collateral_asset, new_liquidator_collateral);
    
    // Reduce user debt
    let (user_debt) = user_borrow_balance.read(user, debt_asset);
    let (new_debt) = uint256_sub(user_debt, amount);
    user_borrow_balance.write(user, debt_asset, new_debt);
    
    Liquidation.emit(caller, user, collateral_asset, debt_asset, amount);
    return ();
}

// Flash loan function
@external
func flash_loan{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt, amount: Uint256, receiver: felt, params: felt*
) {
    let (caller) = get_caller_address();
    
    // Check available liquidity
    let (available) = get_available_liquidity(asset);
    assert_le(amount, available);
    
    // Calculate fee
    let (fee) = calculate_flash_loan_fee(amount);
    
    // Execute flash loan callback
    // Note: In a real implementation, this would call the receiver contract
    
    // Verify repayment
    let (repaid_amount, _) = uint256_add(amount, fee);
    // Check that the loan + fee has been repaid
    
    return ();
}

// Helper functions
@view
func calculate_health_factor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt
) -> (health_factor: Uint256) {
    // Simplified health factor calculation
    // In reality, this would iterate through all user positions
    let (collateral_value) = get_user_collateral_value(user);
    let (debt_value) = get_user_debt_value(user);
    
    if (debt_value.low == 0 and debt_value.high == 0) {
        return (Uint256(2**128 - 1, 2**128 - 1),);  // Max value if no debt
    }
    
    let (health_factor, _) = uint256_div(collateral_value, debt_value);
    return (health_factor,);
}

@view
func get_user_collateral_value{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt
) -> (value: Uint256) {
    // Simplified - would iterate through all assets
    return (Uint256(1000, 0),);  // Placeholder
}

@view
func get_user_debt_value{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    user: felt
) -> (value: Uint256) {
    // Simplified - would iterate through all assets
    return (Uint256(500, 0),);  // Placeholder
}

@view
func get_available_liquidity{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt
) -> (liquidity: Uint256) {
    let (total_supply_amount) = total_supply.read(asset);
    let (total_borrowed_amount) = total_borrowed.read(asset);
    let (available) = uint256_sub(total_supply_amount, total_borrowed_amount);
    return (available,);
}

@view
func calculate_flash_loan_fee{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    amount: Uint256
) -> (fee: Uint256) {
    // 0.09% fee
    let (fee, _) = uint256_mul(amount, Uint256(9, 0));
    let (final_fee, _) = uint256_div(fee, Uint256(10000, 0));
    return (final_fee,);
}

@view
func calculate_liquidation_bonus{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt, amount: Uint256
) -> (bonus: Uint256) {
    // 5% liquidation bonus
    let (bonus_amount, _) = uint256_mul(amount, Uint256(105, 0));
    let (final_bonus, _) = uint256_div(bonus_amount, Uint256(100, 0));
    return (final_bonus,);
}

// Interest rate calculation
@view
func calculate_interest_rate{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    asset: felt
) -> (supply_rate: Uint256, borrow_rate: Uint256) {
    let (total_supply_amount) = total_supply.read(asset);
    let (total_borrowed_amount) = total_borrowed.read(asset);
    
    // Calculate utilization rate
    let (utilization, _) = uint256_div(total_borrowed_amount, total_supply_amount);
    
    // Get interest rate model parameters
    let (base_rate, slope1, slope2) = interest_rate_model.read(asset);
    
    // Simplified interest rate calculation
    let (borrow_rate, _) = uint256_add(base_rate, slope1);
    let (reserve_factor_value) = reserve_factor.read(asset);
    let (supply_rate, _) = uint256_mul(borrow_rate, utilization);
    
    return (supply_rate, borrow_rate);
}
