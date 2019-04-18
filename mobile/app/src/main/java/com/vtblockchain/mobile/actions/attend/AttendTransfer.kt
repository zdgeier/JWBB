package com.vtblockchain.mobile.actions.attend

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

class AttendTransfer(chainApi: ChainApi) : ChainTransaction(chainApi) {

    data class Args(
        val account: String,
        val xval: Float,
        val yval: Float,
        val crn: Long,
        val startTime: Int,
        val endTime: Int
    )

    fun record(
        contract: String,
        args: Args,
        transactionContext: TransactionContext
    ): Single<ChainResponse<TransactionCommitted>> {
        return push(
            transactionContext.expirationDate,
            asList(ActionAbi(
                contract,
                "record",
                asList(TransactionAuthorizationAbi(
                    transactionContext.authorizingAccountName,
                    "active")),
                transferBin(args)
            )),
            transactionContext.authorizingPrivateKey
        )
    }

    private fun transferBin(args: Args): String {
        return AbiBinaryGenAttendWriter(CompressionType.NONE).squishAttendBody(
            AttendBody(
                AttendArgs(
                    args.account,
                    args.xval,
                    args.yval,
                    args.crn,
                    args.startTime,
                    args.endTime
                )
            )
        ).toHex()
    }
}