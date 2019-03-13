package com.vtblockchain.mobile.actions.note

import com.memtrip.eos.abi.writer.compression.CompressionType
import com.memtrip.eos.chain.actions.ChainResponse
import com.memtrip.eos.chain.actions.transaction.ChainTransaction
import com.memtrip.eos.chain.actions.transaction.TransactionContext
import com.memtrip.eos.chain.actions.transaction.abi.ActionAbi
import com.memtrip.eos.chain.actions.transaction.abi.TransactionAuthorizationAbi
import com.memtrip.eos.http.rpc.ChainApi
import com.memtrip.eos.http.rpc.model.transaction.response.TransactionCommitted

import io.reactivex.Single
import java.util.Arrays.asList

class NoteTransfer(chainApi: ChainApi) : ChainTransaction(chainApi) {

    data class Args(
        val account: String,
        val xval: Float,
        val yval: Float,
        val crn: Long
    )

    fun update(
        contract: String,
        args: Args,
        transactionContext: TransactionContext
    ): Single<ChainResponse<TransactionCommitted>> {
        return push(
            transactionContext.expirationDate,
            asList(ActionAbi(
                contract,
                "update",
                asList(TransactionAuthorizationAbi(
                    transactionContext.authorizingAccountName,
                    "active")),
                transferBin(args)
            )),
            transactionContext.authorizingPrivateKey
        )
    }

    private fun transferBin(args: Args): String {
        return AbiBinaryGenNoteWriter(CompressionType.NONE).squishNoteBody(
            NoteBody(
                NoteArgs(
                    args.account,
                    args.xval,
                    args.yval,
                    args.crn
                )
            )
        ).toHex()
    }
}