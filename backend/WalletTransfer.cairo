%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_caller_address

@storage_var
func balances(owner: felt) -> (balance: felt):
end

# Deposit function to add funds to a wallet
@external
func deposit{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(amount: felt):
    let (caller_address) = get_caller_address()
    let (current_balance) = balances.read(caller_address)
    balances.write(caller_address, current_balance + amount)
    return ()
end

# Transfer function to send funds from one wallet to another
@external
func transfer{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(recipient: felt, amount: felt):
    let (caller_address) = get_caller_address()
    let (current_balance) = balances.read(caller_address)
    assert current_balance >= amount, "Insufficient balance"
    balances.write(caller_address, current_balance - amount)

    let (recipient_balance) = balances.read(recipient)
    balances.write(recipient, recipient_balance + amount)
    return ()
end

# View function to check balance
@view
func balanceOf{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(owner: felt) -> (balance: felt):
    let (current_balance) = balances.read(owner)
    return (balance=current_balance)
end